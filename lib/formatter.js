const cli = require('./report-cli')
const csv = require('./report-csv')
const html = require('./report-html')
const jira = require('./report-jira')
const json = require('./report-json')
const md = require('./report-md')
const xml = require('./report-xml')

module.exports = report => {
  return new Promise((resolve, reject) => {
    switch (report.settings.format) {
      case 'csv':
        resolve(csv.results(report))
        break

      case 'html':
        html
          .results(report)
          .then(formatted => {
            resolve(formatted)
          })
          .catch(err => reject(err))
        break

      case 'markdown':
      case 'md':
        resolve(md.results(report))
        break

      case 'xml':
        resolve(xml.results(report))
        break

      case 'jira':
        resolve(jira.results(report))
        break

      case 'json':
        resolve(json.results(report))
        break

      case 'cli':
      default:
        resolve(cli.results(report))
        break
    }
  })
}
