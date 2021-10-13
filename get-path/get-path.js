module.exports = function getPath(elem) {
  let currentElem = elem
  let currentSelector
  let currentResult = []

  if (!(elem instanceof Element)) {
    throw new TypeError('Expected a valid DOM element as an argument')
  }

  while (currentElem.tagName !== 'HTML') {
    if (currentElem.id.length > 0) {
      currentResult.unshift(`#${currentElem.id}`)
      break
    }

    currentSelector = currentElem.tagName.toLowerCase()
    let classSelector = Array.prototype.join.call(currentElem.classList, '.')
    if (classSelector.length > 0) {
      currentSelector += `.${classSelector}`
    }

    let childElementCount = currentElem.parentNode.childElementCount
    if (childElementCount > 1) {
      let elemPosition = Array.prototype.indexOf.call(currentElem.parentNode.children, currentElem) + 1
      if (elemPosition === 1) {
        currentSelector += ':first-child'
      } else if (elemPosition === childElementCount) {
        currentSelector += ':last-child'
      } else {
        currentSelector += `:nth-child(${elemPosition})`
      }
    }
    currentResult.unshift(currentSelector)
    currentElem = currentElem.parentNode
  }

  return currentResult.join(' ')
}
