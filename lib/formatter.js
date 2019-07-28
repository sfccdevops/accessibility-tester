const cli = require('./report-cli')
const csv = require('./report-csv')
const html = require('./report-html')
const json = require('./report-json')
const md = require('./report-md')
const xml = require('./report-xml')

module.exports = output => {
  return new Promise((resolve, reject) => {
    switch (output.options.format) {
      case 'csv':
        resolve(csv.results(output))
        break

      case 'html':
        html
          .results(output)
          .then(formatted => {
            resolve(formatted)
          })
          .catch(err => reject(err))
        break

      case 'markdown':
      case 'md':
        resolve(md.results(output))
        break

      case 'xml':
        resolve(xml.results(output))
        break

      case 'json':
        resolve(json.results(output))
        break

      case 'cli':
      default:
        resolve(cli.results(output))
        break
    }
  })
}
