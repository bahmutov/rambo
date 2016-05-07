'use strict'

const grab = require('./grab')
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('../tests/same')

/* global describe, it */
describe('grab', () => {
  describe('number pairs', () => {
    it('is a function', () => {
      la(is.fn(grab.numberPairs))
    })

    it('finds just number pairs from single array', () => {
      const i = ['foo', [1, 2], 'bar', [3, 4]]
      const o = grab.numberPairs(i)
      const e = [[1, 2], [3, 4]]
      same(o, e, 'pairs', o)
    })

    it('returns just numbers', () => {
      const i = [['foo', 3], [1, 2], 'bar', [3, 4]]
      const o = grab.numberPairs(i)
      const e = [[1, 2], [3, 4]]
      same(o, e, 'pairs', o)
    })

    it('flattens single level', () => {
      const i = [
        [['foo', 3], true],
        [[1, 2], true],
        ['bar', true],
        [[3, 4], false]
      ]
      const o = grab.numberPairs(i)
      const e = [[1, 2], [3, 4]]
      same(o, e, 'pairs', o)
    })
  })
})
