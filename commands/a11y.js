const chalk = require('chalk')
const ora = require('ora')
const pa11y = require('pa11y')
const url = require('url')
const path = require('path')

const config = require('../lib/config')
const formatter = require('../lib/formatter')
const parser = require('../lib/parser')
const slug = require('../lib/slug')
const write = require('../lib/write')

const spinner = ora(`${chalk.bold('Running Accessibility Tester')}`.concat(`${chalk.grey(' [Ctrl-C to Cancel]')}\n`))
const logger = fn => {
  spinner.stop()
  fn()
  spinner.start()
}

/**
 * Handle Exception if one of the test processes fail
 * @param {string} label Error Label
 * @param {object} err Error Object
 */
const handleException = (label, err) => {
  // Update Test Runner with Failed Status
  if (label) {
    console.log(`\n${chalk.red('✖')} ${chalk.red.bold(label)}: ${err}\n`)
  } else {
    console.log(`\n${chalk.red('✖')} ${err.message}\n`)
  }
  // Kill process with error code
  process.exit(1)
}

/**
 *  Create Report
 * @param {object} test Built from CLI and/or Config
 */
const createReport = test => {
  return new Promise((resolve, reject) => {
    // Run Test on URL with Options
    pa11y(test.url, test).then(results => {
      // Parse Results of Test to add Custom Attributes
      parser(test, results).then(output => {
        // Take Custom Results and Format them based on preferences
        formatter(output).then(report => {
          // Write Report
          write(output, report).then(status => {
            resolve(status)
          }).catch(err => reject(new Error(`Report Error: ${err.message}`)))
        }).catch(err => reject(new Error(`Format Error: ${err.message}`)))
      }).catch(err => reject(new Error(`Parsing Error: ${err.message}`)))
    }).catch(err => reject(new Error(`Test Error: ${err.message}`)))
  })
}

// Keep of Tests we want to run, so we can run them in sequence
let testRunner = []

module.exports = async options => {
  try {
    // Get settings from config file and/or passed in params
    const settings = await config(options)

    // Verify we have tests to run
    if (settings && settings.tests && settings.tests.length > 0) {
      // Intentional Empty Line
      console.log('')

      // Start animating the loading spinner
      spinner.start()

      // Loop through Configured Tests
      settings.tests.forEach(test => {
        // Verify we have a URL
        if (test.url) {
          let website = url.parse(test.url, true)

          // Verify this is a valid URL
          if (website && website.host && (website.protocol === 'http:' || website.protocol === 'https:')) {
            // Check if we have a label for this test, otherwise create one
            if (!test.label) {
              test.label = website.host
            }
          } else {
            handleException('Test Error', `Invalid Test URL ${test.url}`)
          }
        } else {
          handleException('Test Error', 'Missing Test URL')
        }

        // Clone original settings to make test specific settings
        let opts = Object.assign({}, settings)

        // Allow overwriting base options with test specific options
        if (test.ignore && Array.isArray(test.ignore)) {
          opts.ignore = test.ignore
        }

        if (typeof test.notices === 'boolean') {
          opts.includeNotices = test.notices
        }

        if (typeof test.screenCapture === 'boolean') {
          opts.screenCapture = test.screenCapture
        }

        if (typeof test.timeout === 'number') {
          opts.timeout = test.timeout
        }

        if (typeof test.wait === 'number') {
          opts.wait = test.wait
        }

        if (typeof test.warnings === 'boolean') {
          opts.includeWarnings = test.warnings
        }

        if (typeof test.auth === 'object' && typeof test.auth.username === 'string' && typeof test.auth.password === 'string') {
          opts.auth = test.auth
        }

        // See if we have authentication we need to set
        if (typeof opts.auth === 'object' && typeof opts.auth.username === 'string' && typeof opts.auth.password === 'string') {
          // Create Basic Authentication from provided auth
          const credentials = `${opts.auth.username}:${opts.auth.password}`
          const encodedCredentials = new Buffer(credentials).toString('base64')

          opts.headers = {
            'Authorization': `Basic ${encodedCredentials}`
          }
        }

        // Update screen capture path if we want to take one
        if (test.screenCapture) {
          opts.screenCapture = path.join(opts.output, `${slug(test.label)}.jpg`)
        }

        // Pass in some test specific settings
        opts.url = test.url
        opts.label = test.label

        // We don't need to pass this in
        delete opts.tests

        // Add Test to Test Runner
        testRunner.push(createReport(opts).then(status => {
          logger(() => { console.log(status) })
        }).catch(err => { handleException(null, err) }))
      })

      Promise.all(testRunner).then(function() {
        if (settings.format === 'cli') {
          spinner.stop()
        } else {
          spinner.succeed(`${chalk.green.bold('Testing Complete')}\n`)
        }
      }).catch(err => { handleException(null, err) });
    } else {
      handleException('Config Error', 'No URL\'s Were Configured for Testing')
    }
  } catch(err) {
    handleException('A11Y Error', err)
  }
}
