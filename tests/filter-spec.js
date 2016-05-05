'use strict'

const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

/* global describe, it */
describe.only('R.filter', () => {
  describe('R.filter(R.is(Number))', () => {
    const solution = solve([1, 2, 'foo', 'bar', -10], [1, 2, -10])

    it('finds solution from the examples', () => {
      la(is.fn(solution.f), 'found solution function')
    })

    it('works', () => {
      const i = [4, 10, null, 'foo', 'f']
      const expected = [4, 10]
      const computed = solution.f(i)
      same(computed, expected, 'computed', computed)
    })
  })
})
