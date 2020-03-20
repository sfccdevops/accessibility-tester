#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

const argv = yargs
  .usage('\nAutomated Accessibility Tester\n\nUsage: rvw-a11y --options')
  .options({
    actions: {
      alias: 'a',
      describe: 'Test Actions',
      type: 'array',
      default: []
    },
    config: {
      alias: 'c',
      describe: 'Path to Configuration File',
      type: 'string',
      default: null
    },
    format: {
      alias: 'f',
      describe: 'Output Format of Report',
      type: 'string',
      default: 'cli'
    },
    compress: {
      alias: 'C',
      describe: 'Compress HTML Report',
      type: 'boolean',
      default: false
    },
    ignore: {
      alias: 'i',
      describe: 'Error Codes to Ignore',
      type: 'array',
      default: []
    },
    notices: {
      alias: 'n',
      describe: 'Include Notices in Report',
      type: 'boolean',
      default: true
    },
    open: {
      alias: 'O',
      describe: 'Open Report after Creation',
      type: 'boolean',
      default: false
    },
    output: {
      alias: 'o',
      describe: 'Output Directory for Reports',
      type: 'string',
      default: null
    },
    screenCapture: {
      alias: 'S',
      describe: 'Screen Capture for Report',
      type: 'boolean',
      default: false
    },
    standard: {
      alias: 's',
      describe: 'Accessibility Standard',
      type: 'string',
      default: 'WCAG2AA'
    },
    timeout: {
      alias: 't',
      describe: 'Test Timeout in Milliseconds',
      type: 'number',
      default: 30000
    },
    wait: {
      alias: 'W',
      describe: 'Page Load Wait in Milliseconds',
      type: 'number',
      default: 0
    },
    warnings: {
      alias: 'w',
      describe: 'Include Warnings in Report',
      type: 'boolean',
      default: true
    },
    runInBrowser: {
      alias: 'b',
      describe: 'Run Tests in Browser Window',
      type: 'boolean',
      default: false
    },
    viewport: {
      alias: 'V',
      describe: 'Viewport Screen Size',
      type: 'string',
      default: 'desktop'
    }
  })
  .command('*', 'Run A11Y Tests using Options')
  .command('auth', 'Generate Authentication Token')
  .example('a11y -c /path/to/config.json', 'Run Test using Provided Config')
  .example('a11y https://mywebsite.com --open', 'Run Test on URL')
  .example(' ', ' ')
  .example('----------------------------------', '------------------------------------------')
  .example('NEED MORE HELP ?', 'https://bit.ly/rvw-a11y-help')
  .example('----------------------------------', '------------------------------------------')
  .help()
  .version().argv

const command = argv._[0]

// Check if we passed in either a URL or a config file
if (argv._.length === 0 && !argv.config) {
  yargs.showHelp()
} else if (command === 'auth') {
  require(path.join(__dirname, '../commands/auth.js'))(argv)
} else {
  require(path.join(__dirname, '../commands/a11y.js'))(argv)
}
