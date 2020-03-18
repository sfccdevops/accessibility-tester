'use strict'

const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const report = (module.exports = {})

// Supported Versions
report.supports = '^5.0.0 || ^5.0.0-alpha || ^5.0.0-beta'

// Compile template and output formatted results
report.results = async testResults => {
    const resourcePath = path.join(__dirname, '../', 'resources')
	const templateString = await readFile(path.resolve(`${resourcePath}/report.html`), 'utf-8')
	const template = handlebars.compile(templateString)

	let output = Object.assign({}, testResults)

	testResults.results.forEach((result, index) => {
		if (result.screenCapture) {
			output.results[index].screenCapture = result.screenCapture.replace(/^.*[\\\/]/, '') // eslint-disable-line no-useless-escape
		}
	})

	return template(testResults)
}

// Output error messages
report.error = message => {
	return message
}
