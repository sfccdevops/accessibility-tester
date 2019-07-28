/**
 * Generate Helper Links for detected Section 508 Compliance Issues
 */
module.exports = code => {
  // Break Up Code to Build Helper Links for Developers
  let parts = code.split('.')
  let section = parts[1]

  parts.shift()
  parts.unshift('[Standard]')

  // Build Help Links
  let resources = [
    {
      type: 'Rule',
      url: `https://squizlabs.github.io/HTML_CodeSniffer/Standards/Section508#pr${section.toUpperCase()}`,
      label: `1194.22 (${section.toLowerCase()})`
    }
  ]

  return resources
}
