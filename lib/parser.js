const moment = require('moment')

const section508 = require('./standard-508')
const wcag2 = require('./standard-wcag2')

/**
 * @function
 * @description Parser for Accessibility Issue
 */
module.exports = (test, results) => {
  // Setup Base Report
  let parsed = {
    documentTitle: results.documentTitle,
    pageUrl: results.pageUrl,
    date: moment().format('LLLL'),
    options: test,
    total: {
      all: 0,
      error: 0,
      warning: 0,
      notice: 0
    },
    issues: []
  }

  // Parse each issue to get more helpful code
  results.issues.forEach(issue => {
    let resources

    // Update Report Totals
    parsed.total.all += 1
    parsed.total[issue.type] += 1

    // Generate Help Links
    if (test.standard === 'Section508') {
      resources = section508(issue.code)
    } else if (test.standard.substring(0, 5) === 'WCAG2') {
      resources = wcag2(issue.code)
    }

    // Update Issues with Help Links
    parsed.issues.push({
      code: issue.code,
      context: issue.context ? issue.context.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ') : null,
      resources: resources,
      message: issue.message,
      type: issue.type,
      typeCode: issue.typeCode,
      selector: issue.selector
    })
  })

  // Sort Issues by Type
  let sortedIssues = parsed.issues.slice(0)
  sortedIssues.sort(function(a, b) {
    return a.typeCode - b.typeCode
  })

  parsed.issues = sortedIssues

  return new Promise(resolve => {
    resolve(parsed)
  })
}
