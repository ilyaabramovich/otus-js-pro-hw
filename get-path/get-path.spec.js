const getPath = require('./get-path.js')

describe('getPath', () => {
  it('throws error when called with invalid argument', () => {
    expect(() => getPath('')).toThrow()
  })

  it('returns valid selector', () => {
    let div = document.createElement('div')
    div.className = 'foo'
    let div2 = document.createElement('div')
    document.body.appendChild(div)
    document.body.appendChild(div2)

    let result = getPath(div)
    expect(() => document.querySelectorAll(result)).not.toThrow()
  })

  it('returns selector that gives single element', () => {
    let div = document.createElement('div')
    div.className = 'foo'
    let div2 = document.createElement('div')
    document.body.appendChild(div)
    document.body.appendChild(div2)

    let result = getPath(div)

    expect(document.querySelectorAll(result)).toHaveLength(1)
  })
})
