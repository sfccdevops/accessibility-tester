'use strict'

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Output formatted results
report.results = testResults => {
  const clone = Object.assign({}, testResults)

  delete clone.settings

  clone.results.forEach((test, index) => {
    delete clone.results[index].options
  })

  return JSON.stringify(clone, null, 2)
}

// Output error messages
report.error = message => {
  return message
}
