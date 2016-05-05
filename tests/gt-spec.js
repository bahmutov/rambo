'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

/* global describe, it */
describe('R.gt', () => {
  it('passes if first number is larger than second', () => {
    la(R.gt(10, 9))
    la(!R.gt(10, 11))
  })

  it('is curried', () => {
    const gt10 = R.gt(10)
    la(is.fn(gt10))
    la(gt10(3))
  })

  describe('single input', () => {
    const examples = [
      [[3, 1], true],
      [[3, 10], false]
    ]
    const solution = solve(examples)

    it('finds solution from the examples', () => {
      la(is.fn(solution.f))
    })

    it('works on example', () => {
      // TODO even if examples are a spread, we probably want to
      // get back the original function
      const o = solution.f(3, 1)
      same(o, true, o)
    })

    it('works on control', () => {
      same(solution.f(10, 6), true, solution.f(10, 6))
      same(solution.f(6, 10), false, solution.f(6, 10))
      same(solution.f(6, 6), false, solution.f(6, 6))
    })
  })

  describe('R.filter(R.gt(10))', () => {
    const input = [10, 2, 3, 40]
    const output = [2, 3]
    const solution = solve(input, output)

    it('has solution using filter and gt', () => {
      const gt10 = R.gt(10)
      const o = R.filter(gt10, input)
      same(o, output, 'wrong output', o)
    })

    it('finds solution from the examples', () => {
      la(is.fn(solution.f), 'found solution function')
    })

    it.skip('works', () => {
      const i = [11, 4, 10]
      const expected = [4]
      const computed = solution.f(i)
      same(computed, expected, 'computed', computed)
    })
  })
})
