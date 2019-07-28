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
      url: `http://www.w3.org/TR/WCAG20/#${principles[principle].toLowerCase()}`,
      label: principles[principle]
    },
    {
      type: 'Success Criterion',
      url: `https://squizlabs.github.io/HTML_CodeSniffer/Standards/WCAG2/${successCriterion}`,
      label: successCriterion.replace(new RegExp('_', 'g'), '.')
    }
  ]

  // Loop Through Returned Techniques
  for (let j = 0; j < techniques.length; j++) {
    resources.push({
      type: 'Technique',
      url: `http://www.w3.org/TR/WCAG20-TECHS/${techniques[j]}`,
      label: techniques[j]
    })
  }

  return resources
}
