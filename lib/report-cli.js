'use strict'

const chalk = require('chalk')

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Helper strings for use in reporter methods
const start = chalk.cyan(' >')
const typeStarts = {
  error: chalk.red('✖  Error:'),
  notice: chalk.cyan('◆  Notice:'),
  unknown: chalk.grey('›'),
  warning: chalk.yellow('▲  Warning:')
}

// Output formatted results
report.results = results => {
  let message

  if (results.issues.length) {
    message = `${chalk.bold('Results for:')} ${chalk.underline(results.pageUrl)}\n`
    message += `${results.issues.map(report.issue).join('\n')}\n\n`
    message += `${report.totals(results)}\n\n`
  }

  return message
}

// Internal method used to report an individual result
report.issue = issue => {
  const code = issue.code
  const selector = issue.selector ? issue.selector : 'N/A'
  const context = issue.context ? issue.context : 'N/A'
  const prefix = chalk.dim.grey('├─')

  let message = `\n${typeStarts[issue.type]} ${issue.message}\n`

  if (issue.code) {
    message += `${prefix} Code: ${chalk.grey(code)}\n`
  }

  if (issue.selector) {
    message += `${prefix} Selector: ${chalk.grey(selector)}\n`
  }

  if (issue.context) {
    message += `${prefix} Context: ${chalk.grey(context)}\n`
  }

  if (issue.resources) {
    message += `${prefix} Resources:\n`
    issue.resources.forEach(link => {
      message += `   ${prefix} ${link.type} ${link.label}: ${chalk.grey(link.url)}\n`
    })
  }

  return message
}

// Internal method used to report issue totals
report.totals = results => {
  let output = []

  if (results.total.error > 0) {
    output.push(chalk.bold.red(`✖ ${results.total.error} Errors`))
  }

  if (results.total.warning > 0) {
    output.push(chalk.bold.yellow(`▲ ${results.total.warning} Warnings`))
  }

  if (results.total.notice > 0) {
    output.push(chalk.bold.cyan(`◆ ${results.total.notice} Notices`))
  }

  return output.join('\n')
}

// Output error messages
report.error = message => {
  if (!/^error:/i.test(message)) {
    message = `Error: ${message}`
  }

  return `\n${chalk.red(message)}\n`
}

// Output debug messages
report.debug = message => {
  message = `Debug: ${message}`
  return `${start} ${chalk.grey(message)}`
}

// Output information messages
report.info = message => {
  return `${start} ${message}`
}
