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
  warning: chalk.keyword('orange')('▲  Warning:')
}

// Output formatted results
report.results = testResults => {
  let output = []

  testResults.results.forEach(result => {
    if (result.issues.length) {
      output.push(`${chalk.bold.green('⚑')} ${chalk.bold('Results for:')} ${chalk.underline(result.pageUrl)}`)
      output.push(`${result.issues.map(report.issue).join('\n')}\n`)
      output.push(`${report.totals(result.total)}\n`)
    } else {
      output.push(`${chalk.bold.green('⚑')} ${chalk.bold('No Issues for:')} ${chalk.underline(result.pageUrl)}\n`)
    }

    output.push(`${chalk.dim.grey('────────────────────────────────────────────────────────────────────────────────\n')}`)
  })

  output.push(`${chalk.bold.green('⚑')} ${chalk.bold('Total Issues:')}\n`)
  output.push(`${report.totals(testResults.total)}\n`)

  return output.join('\n')
}

// Internal method used to report an individual result
report.issue = issue => {
  const code = issue.code
  const selector = issue.selector ? issue.selector : 'N/A'
  const context = issue.context ? issue.context : 'N/A'
  const prefix = chalk.dim.grey('├─')

  let output = []

  output.push(`\n${typeStarts[issue.type]} ${issue.message}`)

  if (issue.recommendation) {
    output.push(`${prefix} ${chalk.bold.green('Fix')}: ${issue.recommendation}`)
  }

  if (issue.code) {
    output.push(`${prefix} Code: ${chalk.grey(code)}`)
  }

  if (issue.selector) {
    output.push(`${prefix} Selector: ${chalk.grey(selector)}`)
  }

  if (issue.context) {
    output.push(`${prefix} Context: ${chalk.grey(context)}`)
  }

  if (issue.resources) {
    output.push(`${prefix} Resources:`)
    issue.resources.forEach(link => {
      output.push(`   ${prefix} ${link.type} ${link.label}: ${chalk.grey(link.url)}`)
    })
  }

  return output.join('\n')
}

// Internal method used to report issue totals
report.totals = total => {
  let output = []

  if (total.error > 0) {
    output.push(chalk.bold.red(`✖ ${total.error} Errors`))
  }

  if (total.warning > 0) {
    output.push(chalk.bold.keyword('orange')(`▲ ${total.warning} Warnings`))
  }

  if (total.notice > 0) {
    output.push(chalk.bold.cyan(`◆ ${total.notice} Notices`))
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
