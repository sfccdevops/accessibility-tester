const chalk = require('chalk')
const moment = require('moment')
const open = require('open')
const ora = require('ora')
const pa11y = require('pa11y')
const url = require('url')
const path = require('path')

const config = require('../lib/config')
const formatter = require('../lib/formatter')
const parser = require('../lib/parser')
const write = require('../lib/write')

const spinner = ora()
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
    console.log(`\n${chalk.red('✖')} ${chalk.red.bold(label)}: ${err.message ? err.message : err}\n`)
  } else {
    console.log(`\n${chalk.red('✖')} ${err.message ? err.message : err}\n`)
  }
  // Kill process with error code
  process.exit(1)
}

/**
 *  Run Test
 * @param {object} test Built from CLI and/or Config
 */
const runTest = test => {
  return new Promise((resolve, reject) => {
    // Run Test on URL with Options
    pa11y(test).then(results => {
      // Parse Results of Test to add Custom Attributes
      parser(test, results).then(output => {
        // Return Parsed Test Results
        resolve(output)
      }).catch(err => reject(new Error(`Parsing Error: ${err.message ? err.message : err}`)))
    }).catch(err => reject(new Error(`Test Error: ${err.message ? err.message : err}`)))
  })
}

// Store Test Results
const testResults = {
  generated: {
    date: moment().format('LLLL'),
    label: 'Red Van Workshop - Accessibility Tester',
    url: 'https://github.com/redvanworkshop/accessibility-tester'
  },
  settings: {},
  total: {
    all: 0,
    error: 0,
    notice: 0,
    warning: 0
  },
  results: []
}

// Keep of Tests we want to run, so we can run them in sequence
const testRunner = []

module.exports = async options => {
  try {
    // Get settings from config file and/or passed in params
    const settings = await config(options)

    // Update TEs
    testResults.settings = settings

    // Verify we have tests to run
    if (settings && settings.tests && settings.tests.length > 0) {
      // Intentional Empty Line
      console.log('')

      // Start animating the loading spinner
      const text = settings.tests.length === 1 ? 'Running Accessibility Test' : `Running ${settings.tests.length} Accessibility Tests`
      spinner.text = `${chalk.bold(text)}`.concat(`${chalk.grey(' [Ctrl-C to Cancel]')}\n`)
      spinner.start()

      // Loop through Configured Tests
      settings.tests.forEach(test => {
        let website

        // Verify we have a URL
        if (test.url) {
          website = url.parse(test.url, true)

          // Verify this is a valid URL
          if (!website || !website.host || (website.protocol === 'http:' && website.protocol === 'https:')) {
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

        if (test.actions && Array.isArray(test.actions)) {
          opts.actions = test.actions
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
        } else if (typeof test.auth === 'object' && typeof test.auth.token === 'string') {
          opts.auth = test.auth
        }

        // See if we have authentication we need to set
        if (typeof opts.auth === 'object' && typeof opts.auth.username === 'string' && typeof opts.auth.password === 'string') {
          // Create Basic Authentication from provided auth
          const credentials = `${opts.auth.username}:${opts.auth.password}`
          const token = new Buffer(credentials).toString('base64')

          opts.headers = {
            'Authorization': `Basic ${token}`
          }
        } else if (typeof opts.auth === 'object' && typeof opts.auth.token === 'string') {
          opts.headers = {
            'Authorization': `Basic ${opts.auth.token}`
          }
        }

        if (opts.screenCapture) {
          const timestamp = moment().format('YYYYMMDD_HHmmss')
          opts.screenCapture = path.join(opts.output, `screenshot_${website.host}_${timestamp}.jpg`)
        }

        // Pass in some test specific settings
        opts.url = test.url

        // We don't need to pass this in
        delete opts.tests

        // Add Test to Test Runner
        testRunner.push(runTest(opts).then(result => {
          // Add Test Results
          testResults.results.push(result)

          // Update Issue Counter
          testResults.total.all += result.total.all
          testResults.total.error += result.total.error
          testResults.total.notice += result.total.notice
          testResults.total.warning += result.total.warning

        }).catch(err => { handleException(null, err.message) }))
      })

      Promise.all(testRunner).then(function() {
        // Take Custom Results and Format them based on preferences
        formatter(testResults).then(report => {
          // Write Report
          write(testResults, report).then(status => {
            if (status) {
              if (testResults.settings.format !== 'cli') {
                logger(() => { console.log(status.message) })
                spinner.succeed(`${chalk.green.bold('Testing Complete')}\n`)

                if (options.open) {
                  open(status.file)
                }
              } else if (testResults.settings.format === 'cli') {
                logger(() => { console.log(status) })
                spinner.stop()
              }
            } else {
              handleException('Report Error:', 'An Unknown Error Occurred')
            }
          }).catch(err => handleException('Report Error:', err.message))
        }).catch(err => handleException('Format Error:', err.message))
      }).catch(err => handleException('A11Y Error:', err.message))

    } else {
      handleException('Config Error', 'No URL\'s Were Configured for Testing')
    }
  } catch(err) {
    handleException('A11Y Error', err.message)
  }
}
