/**
 * Generate Helper Links for detected WCAG2A, WCAG2AA & WCAG2AAA Compliance Issues
 */
module.exports = code => {
  // Break Up A11Y Code to Build Helper Links for Developers
  let parts = code.split('.')
  let principle = parts[1]
  let successCriterion = parts[3]
    .split('_')
    .slice(0, 3)
    .join('_')
  let techniques = parts[4].split(',')
  let principles = {
    Principle1: 'Perceivable',
    Principle2: 'Operable',
    Principle3: 'Understandable',
    Principle4: 'Robust'
  }

  parts.shift()
  parts.unshift('[Standard]')

  // Build Help Links
  let resources = [
    {
      type: 'Principle',
      url: `https://www.w3.org/TR/WCAG20/#${principles[principle].toLowerCase()}`,
      label: principles[principle]
    },
    {
      type: 'Success Criterion',
      url: `https://squizlabs.github.io/HTML_CodeSniffer/Standards/WCAG2/#sc${successCriterion}`,
      label: successCriterion.replace(new RegExp('_', 'g'), '.')
    }
  ]

  const getURL = code => {
    const WCAG21 = 'https://www.w3.org/WAI/WCAG21/Techniques'

    if (code === 'LayoutTable') {
      return `${WCAG21}/failures/F49`
    }
    if (code.startsWith('ARIA')) {
      return `${WCAG21}/aria/${code}`
    }
    if (code.startsWith('PDF')) {
      return `${WCAG21}/pdf/${code}`
    }
    if (code.startsWith('SCR')) {
      return `${WCAG21}/client-side-script/${code}`
    }
    if (code.startsWith('SVR')) {
      return `${WCAG21}/server-side-script/${code}`
    }
    if (code.startsWith('SL')) {
      return `${WCAG21}/silverlight/${code}`
    }
    if (code.startsWith('SM')) {
      return `${WCAG21}/smil/${code}`
    }
    if (code.startsWith('C')) {
      return `${WCAG21}/css/${code}`
    }
    if (code.startsWith('F')) {
      return `${WCAG21}/failures/${code}`
    }
    if (code.startsWith('G')) {
      return `${WCAG21}/general/${code}`
    }
    if (code.startsWith('H')) {
      return `${WCAG21}/html/${code}`
    }
    if (code.startsWith('T')) {
      return `${WCAG21}/text/${code}`
    }

    // Return generic link to technical failure
    return WCAG21
  }

  // Loop Through Returned Techniques
  for (let j = 0; j < techniques.length; j++) {
    const code = techniques[j];
    resources.push({
      type: 'Technique',
      url: getURL(code),
      label: code
    })
  }

  return resources
}
