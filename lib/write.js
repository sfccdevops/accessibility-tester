const archiver = require('archiver')
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
  const timestamp = moment().format('YYYYMMDD_HHmmssSSSS')
  const extension = (testResults.settings.format === 'jira') ? 'txt' : testResults.settings.format
  const fileName = `a11y_${timestamp}.${extension}`
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

      // Compress File if Requested
      if (testResults.settings.compress && testResults.settings.format === 'html') {
        const archive = archiver('zip')
        const archiveFile = `${testResults.settings.output}/a11y_${timestamp}.zip`
        const compressed = fs.createWriteStream(archiveFile)
        const cleanup = [
          reportFile
        ]

        archive.pipe(compressed)
        archive.file(reportFile, { name: fileName })

        testResults.results.forEach(result => {
          if (result.screenCapture) {
            const screenCapturePath = `${testResults.settings.output}/${result.screenCapture}`

            cleanup.push(screenCapturePath)
            archive.file(screenCapturePath, { name: result.screenCapture })
          }
        })

        archive.finalize().then(() => {
          // Perform Cleanup
          cleanup.forEach(file => {
            if (fs.existsSync(file)) {
              fs.unlinkSync(file)
            }
          })
        })

        message.push(`${chalk.dim.grey('├─')} ${chalk.grey(archiveFile)}`)
      } else {
        message.push(`${chalk.dim.grey('├─')} ${chalk.grey(reportFile)}`)
      }

      if (testResults.settings.format === 'jira') {
        message.push(`${chalk.dim.grey('├─')} Jira Ticket: ${chalk.grey('Copy Text from Report and Paste into your ticket ( You will need to use the "Old View" ). Upload Screen Captures as attachments.')}`)
      }

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
