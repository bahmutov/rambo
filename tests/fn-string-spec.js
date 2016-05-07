'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('solution text', () => {
  function add (a, b) {
    return a + b
  }

  it('uses default function toString', () => {
    const s = add.toString()
    la(is.unemptyString(s), s)
  })

  it('has function add', () => {
    const s = add.toString()
    la(is.contains(s, 'function add'), s)
  })

  it('can set toString', () => {
    const add10 = add.bind(null, 10)
    const description = 'add10(x)'
    add10.toString = () => description
    la(add10(2) === 12, 'works')
    const s = add10.toString()
    la(s === description, s)
  })
})
