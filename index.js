'use strict'

module.exports = function thenFold (promise, fns) {
  return fns.reduce((prev, cur) => {
    return prev.then(cur)
  }, promise)
}
