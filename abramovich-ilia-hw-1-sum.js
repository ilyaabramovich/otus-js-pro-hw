function sum(a) {
  return function (b) {
    if (arguments.length === 0) {
      return a
    }
    return sum(a + b)
  }
}
