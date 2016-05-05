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

    it('array concat with empty first array', () => {
      const first = []
      const second = [42, 43]
      const result = first.concat(second)
      same(result, second)
    })

    examples.forEach((example, k) => {
      it(`has valid example ${k}`, () => {
        const i = example[0]
        const expected = example[1]
        la(R.gt(i[0])(i[1]) === expected)
      })

      it(`works with both arguments ${k}`, () => {
        const i = example[0]
        const expected = example[1]
        la(R.gt(i[0], i[1]) === expected)
      })
    })

    it('finds solution from the examples', () => {
      la(solution, 'returned a solution')
      la(is.fn(solution.f), 'has solution function')
    })

    it('has spread flag', () => {
      la(solution.spread, solution)
    })

    it('works on example', () => {
      // TODO even if examples are a spread, we probably want to
      // get back the original function
      const o = solution.f([3, 1])
      same(o, true, o)
    })

    // control examples
    const controls = [
      [[10, 6], true],
      [[6, 10], false],
      [[6, 6], false]
    ]

    controls.forEach((control, k) => {
      it(`passes control ${k}`, () => {
        const i = control[0]
        const expected = control[1]
        la(R.gt(i[0])(i[1]) === expected, 'R.gt()', control)
        la(solution.f(i) === expected, 'solution', control)
      })
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
