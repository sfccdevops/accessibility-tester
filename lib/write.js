const chalk = require('chalk')
const fs = require('fs')
const moment = require('moment')
const slug = require('./slug')

module.exports = (output, report) => {
  // Check if we are running in CLI mode
  if (output.options.format === 'cli') {
    if (!report) {
      return new Promise(resolve => {
        resolve(`${chalk.bold.green('❤')} No Issues for: ${chalk.cyan(output.options.url)}\n`)
      })
    } else {
      return new Promise(resolve => {
        resolve(report)
      })
    }
  }

  // Setup Report Name
  const timestamp = moment().format('YYYYMMDD_HHmmss')
  const fileName = `a11y_${slug(output.options.label)}_${timestamp}.${output.options.format}`
  const reportFile = `${output.options.output}/${fileName}`

  // Write Report to configured Output Directory
  return new Promise((resolve, reject) => {
    fs.writeFile(reportFile, report, function(err) {
      if (err) {
        reject(output)
      }

      let message = []

      message.push(`${chalk.bold.green('⚑')} Report Created for: ${chalk.cyan(output.options.url)}`)
      message.push(`${chalk.dim.grey('├─')} ${chalk.grey(reportFile)}`)

      let totals = ''

      if (output.total.error > 0) {
        totals += `${chalk.bold.red('✖')} ${chalk.grey(output.total.error + ' Errors')} `
      }

      if (output.total.warning > 0) {
        totals += `${chalk.bold.yellow('▲')} ${chalk.grey(output.total.warning + ' Warnings')} `
      }

      if (output.total.notice > 0) {
        totals += `${chalk.bold.cyan('◆')} ${chalk.grey(output.total.notice + ' Notices')} `
      }

      if (totals !== '') {
        message.push(`${chalk.dim.grey('├─')} ${totals}\n`)
      } else {
        message.push(`${chalk.dim.grey('├─')} ${chalk.bold.green('❤')} ${chalk.grey('0 Issues')}\n`)
      }

      resolve(message.join('\n'))
    })
  })
}
