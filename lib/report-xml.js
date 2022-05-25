'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = testResults => {
  let output = []

  output.push('<?xml version="1.0" encoding="UTF-8"?>\n<a11y>')
  output.push('\t<generated>\n\t\t<date>' + testResults.generated.date + '</date>\n\t\t<label>SFCC DevOps - Accessibility Tester</label>\n\t\t<url>https://github.com/sfccdevops/accessibility-tester</url>\n\t</generated>')

  // Add Overall Total
  output.push('\t<total>')
  output.push(`\t\t<errors>${parseInt(testResults.total.error)}</errors>`)
  output.push(`\t\t<warnings>${parseInt(testResults.total.warning)}</warnings>`)
  output.push(`\t\t<notices>${parseInt(testResults.total.notice)}</notices>`)
  output.push('\t</total>')

  output.push('\t<reports>')

  // Loop through reports
  testResults.results.forEach(result => {
    output.push('\t\t<report>')

    output.push('\t\t\t<documentTitle>' + result.documentTitle + '</documentTitle>')
    output.push('\t\t\t<pageUrl>' + result.pageUrl + '</pageUrl>')

    // Add Report Total
    output.push('\t\t\t<total>')
    output.push(`\t\t\t\t<errors>${parseInt(result.total.error)}</errors>`)
    output.push(`\t\t\t\t<warnings>${parseInt(result.total.warning)}</warnings>`)
    output.push(`\t\t\t\t<notices>${parseInt(result.total.notice)}</notices>`)
    output.push('\t\t\t</total>')

    output.push('\t\t\t<issues>')

    // Loop through report issues
    for (let i = 0; i < result.issues.length; i++) {
      const issue = result.issues[i]

      output.push('\t\t\t\t<issue>')
      output.push(`\t\t\t\t\t<type>${issue.type}</type>`)
      output.push(`\t\t\t\t\t<code>${issue.code}</code>`)
      output.push(`\t\t\t\t\t<message>${issue.message}</message>`)

      if (issue.recommendation) {
        output.push(`\t\t\t\t\t<recommendation>${issue.recommendation}</recommendation>`)
      } else {
        output.push(`\t\t\t\t\t<recommendation />`)
      }

      if (issue.selector) {
        output.push(`\t\t\t\t\t<selector><![CDATA[${issue.selector}]]></selector>`)
      } else {
        output.push(`\t\t\t\t\t<selector />`)
      }

      if (issue.context) {
        output.push(`\t\t\t\t\t<context><![CDATA[${issue.context}]]></context>`)
      } else {
        output.push(`\t\t\t\t\t<context />`)
      }

      if (issue.resources) {
        output.push('\t\t\t\t\t<resources>')

        issue.resources.forEach(link => {
          output.push(`\t\t\t\t\t\t<resource>`)
          output.push(`\t\t\t\t\t\t\t<type>${link.type}</type>`)
          output.push(`\t\t\t\t\t\t\t<label>${link.label}</label>`)
          output.push(`\t\t\t\t\t\t\t<url>${link.url}</url>`)
          output.push(`\t\t\t\t\t\t</resource>`)
        })

        output.push('\t\t\t\t\t</resources>')
      } else {
        output.push('\t\t\t\t\t<resources />')
      }

      output.push('\t\t\t\t</issue>')
    }

    output.push('\t\t\t</issues>')

    output.push('\t\t</report>')
  })

  output.push('\t</reports>')

  output.push('</a11y>')

  return output.join('\n')
}

// Output error messages
report.error = message => {
  return message
}
