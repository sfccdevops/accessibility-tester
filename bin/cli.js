#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

const argv = yargs
  .usage('\nAutomated Accessibility Tester\n\nUsage: a11y --options')
  .options({
    config: {
      alias: 'c',
      describe: 'Path to Configuration File',
      type: 'string',
      default: null
    },
    debug: {
      alias: 'd',
      describe: 'Output Debug Messages',
      type: 'boolean',
      default: false
    },
    format: {
      alias: 'f',
      describe: 'Output Format of Report',
      type: 'string',
      default: 'cli'
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
    }
  })
  .example('a11y -c /path/to/config.json', 'Run Test using Provided Config')
  .example('a11y https://mywebsite.com', 'Run Test on URL')
  .example(' ', ' ')
  .example('----------------------------------', '------------------------------------------')
  .example('NEED MORE HELP ?', 'https://bit.ly/sfcc-cli-help')
  .example('----------------------------------', '------------------------------------------')
  .help()
  .version().argv

// Check if we passed in either a URL or a config file
if (argv._.length === 0 && !argv.config) {
  yargs.showHelp()
} else {
  require(path.join(__dirname, '../commands/a11y.js'))(argv)
}
