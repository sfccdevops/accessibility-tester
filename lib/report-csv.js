'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = testResults => {
  let output = ['"url","type","code","message","recommendation","context","selector","resources"']

  testResults.results.forEach(result => {
    output = output.concat(result.issues.map(issue => report.row(result.pageUrl, issue)))
  })

  return output.join('\n')
}

// Internal method used to report an individual CSV row
report.row = (url, issue) => {
  let resources = []

  issue.resources.forEach(resource => {
    resources.push(`${resource.type} ${resource.label}: ${resource.url}`)
  })

  const message = issue.message ? issue.message.replace(/"/g, '”') : 'N/A'
  const selector = issue.selector ? issue.selector.replace(/"/g, '”') : 'N/A'
  const context = issue.context ? issue.context.replace(/"/g, '”') : 'N/A'
  const recommendation = issue.recommendation ? issue.recommendation.replace(/"/g, '”') : 'N/A'

  return [
    JSON.stringify(url),
    JSON.stringify(issue.type),
    JSON.stringify(issue.code),
    JSON.stringify(message),
    JSON.stringify(recommendation),
    JSON.stringify(context),
    JSON.stringify(selector),
    '"' + resources.join('\r\n') + '"'
  ].join(',')
}

// Output error messages
report.error = message => {
  return message
}
