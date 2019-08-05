const chalk = require('chalk')
const fs = require('fs')
const moment = require('moment')

module.exports = (testResults, report) => {
  // Check if we are running in CLI mode
  if (testResults.settings.format === 'cli') {
    if (!report) {
      return new Promise(resolve => {
        resolve(`${chalk.bold.green('❤')} No Issues Found\n`)
      })
    } else {
      return new Promise(resolve => {
        resolve(report)
      })
    }
  }

  // Setup Report Name
  const timestamp = moment().format('YYYYMMDD_HHmmss')
  const fileName = `a11y_${timestamp}.${testResults.settings.format}`
  const reportFile = `${testResults.settings.output}/${fileName}`

  // Write Report to configured settings Directory
  return new Promise((resolve, reject) => {
    fs.writeFile(reportFile, report, function(err) {
      if (err) {
        reject(err)
      }

      let label = (testResults.results.length === 1) ? `${testResults.results.length} Test Completed` : `${testResults.results.length} Tests Completed`

      let message = []

      message.push(`${chalk.bold.green('⚑')} Report Created: ${chalk.grey(label)}`)
      message.push(`${chalk.dim.grey('├─')} ${chalk.grey(reportFile)}`)

      let totals = ''

      if (testResults.total.error > 0) {
        totals += `${chalk.bold.red('✖')} ${chalk.grey(testResults.total.error + ' Errors')} `
      }

      if (testResults.total.warning > 0) {
        totals += `${chalk.bold.keyword('orange')('▲')} ${chalk.grey(testResults.total.warning + ' Warnings')} `
      }

      if (testResults.total.notice > 0) {
        totals += `${chalk.bold.cyan('◆')} ${chalk.grey(testResults.total.notice + ' Notices')} `
      }

      if (totals !== '') {
        message.push(`${chalk.dim.grey('├─')} ${totals}\n`)
      } else {
        message.push(`${chalk.dim.grey('├─')} ${chalk.bold.green('❤')} ${chalk.grey('0 Issues')}\n`)
      }

      resolve({
        file: reportFile,
        message: message.join('\n')
      })
    })
  })
}
