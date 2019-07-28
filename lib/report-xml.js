'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = results => {
  let message = '<?xml version="1.0" encoding="UTF-8"?>\n<report>\n'

  message += '  <reportName>' + results.options.label + '</reportName>\n'
  message += '  <documentTitle>' + results.documentTitle + '</documentTitle>\n'
  message += '  <pageUrl>' + results.pageUrl + '</pageUrl>\n'
  message += '  <date>' + results.date + '</date>\n'
  message += '  <generatedBy>\n    <label>Red Van Workshop - Accessibility Tester</label>\n    <url>https://github.com/redvanworkshop/accessibility-tester</url>\n  </generatedBy>\n'

  if (results.total.error) {
    message += `  <errors>${results.total.error}</errors>\n`
  }

  if (results.total.warning) {
    message += `  <warnings>${results.total.warning}</warnings>\n`
  }

  if (results.total.notice) {
    message += `  <notices>${results.total.notice}</notices>\n`
  }

  message += '  <issues>\n'

  for (let i = 0; i < results.issues.length; i++) {
    const issue = results.issues[i]

    message += '    <issue>\n'
    message += `      <type>${issue.type}</type>\n`
    message += `      <code>${issue.code}</code>\n`
    message += `      <message>${issue.message}</message>\n`

    if (issue.selector) {
      message += `      <selector><![CDATA[${issue.selector}]]></selector>\n`
    }

    if (issue.context) {
      message += `      <context><![CDATA[${issue.context}]]></context>\n`
    }

    if (issue.resources) {
      message += '      <resources>\n'

      issue.resources.forEach(link => {
        message += `        <resource>\n`
        message += `          <type>${link.type}</type>\n`
        message += `          <label>${link.label}</label>\n`
        message += `          <url>${link.url}</url>\n`
        message += `        </resource>\n`
      })

      message += '      </resources>\n'
    }

    message += '    </issue>\n'
  }

  message += '  </issues>\n</report>\n'

  return message
}

// Output error messages
report.error = message => {
  return message
}
