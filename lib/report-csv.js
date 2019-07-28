'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = results => {
  return ['"type","code","message","context","selector","resources"'].concat(results.issues.map(report.row)).join('\n')
}

// Internal method used to report an individual CSV row
report.row = issue => {
  let resources = []

  issue.resources.forEach(resource => {
    resources.push(`${resource.type} ${resource.label}: ${resource.url}`)
  })

  const selector = issue.selector ? issue.selector : 'N/A'
  const context = issue.context ? issue.context : 'N/A'

  return [
    JSON.stringify(issue.type),
    JSON.stringify(issue.code),
    JSON.stringify(issue.message),
    JSON.stringify(context),
    JSON.stringify(selector),
    '"' + resources.join('\r\n') + '"'
  ].join(',')
}

// Output error messages
report.error = message => {
  return message
}
