'use strict'

const test = require('tape')
const thenFold = require('./index')

function testing (x) {
  return new Promise((resolve, reject) => {
    resolve(x)
  })
}

function p1 (x) {
  return x + 1
}

function p2 (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + 1)
    }, 200)
  })
}

test('thenFold', t => {
  t.test('only return values', st => {
    const arr = [ p1, p1, p1 ]

    thenFold(testing(5), arr).then(n => {
      st.equal(n, 8)
      st.end()
    })
  })

  t.test('olny return promises', st => {
    const arr = [ p2, p2, p2 ]

    thenFold(testing(5), arr).then(n => {
      st.equal(n, 8)
      st.end()
    })
  })

  t.test('mixed', st => {
    const arr = [ p2, p2, p1, p1, p2, p1 ]

    thenFold(testing(5), arr).then(n => {
      st.equal(n, 11)
      st.end()
    })
  })

  t.end()
})
