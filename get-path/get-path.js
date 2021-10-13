module.exports = function getPath(elem) {
  let currentElem = elem
  let currentSelector
  let currentResult = []

  if (!(elem instanceof Element)) {
    throw new TypeError('Expected a valid DOM element as an argument')
  }

  while (currentElem.parentNode.tagName !== 'HTML') {
    currentSelector = currentElem.parentNode.tagName

    currentElem = currentElem.parentNode
    let elemPosition = Array.prototype.indexOf.call(currentElem.parentNode.children, currentElem) + 1
    currentSelector += `:nth-child(${elemPosition})`
    let attrsSelector = Array.prototype.map
      .call(currentElem.attributes, (el) => `[${el.nodeName}='${el.nodeValue}']`)
      .join('')
    currentSelector += attrsSelector
    currentResult.unshift(currentSelector)
  }

  return currentResult.join(' ')
}
