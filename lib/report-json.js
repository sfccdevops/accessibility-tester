'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = results => {
  const clone = Object.assign({}, results)

  delete clone.options

  clone.generatedBy = {
    label: 'Red Van Workshop - Accessibility Tester',
    url: 'https://github.com/redvanworkshop/accessibility-tester'
  }

  return JSON.stringify(clone, null, 2)
}

// Output error messages
report.error = message => {
  return message
}
