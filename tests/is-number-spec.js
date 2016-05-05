'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

describe('R.is(Number)', () => {
  describe('single level, multiple inputs', () => {
    const examples = [
      [1, true],
      [5, true],
      ['foo', false]
    ]
    const solution = solve(examples)

    it('finds solution from the examples', () => {
      la(is.fn(solution.f), 'found solution function')
    })

    it('has correct name', () => {
      la(solution.name, solution)
      la(solution.name === 'R.is(Number)', solution)
    })

    it('works on other numbers', () => {
      la(solution.f(42) === true, 42, solution.f(42))
      la(solution.f(-1) === true, -1, solution.f(-1))
      la(solution.f(11) === true, 11, solution.f(11))
    })

    it('works on null', () => {
      la(solution.f(null) === false, solution.f(null))
    })
  })

  describe('single level, multiple inputs for String', () => {
    const examples = [[1, false], [5, false], ['foo', true]]
    const solution = solve(examples)

    it('finds solution from the examples', () => {
      la(is.fn(solution.f), 'found solution function')
    })

    it('works on other numbers', () => {
      la(solution.f(42) === false, solution.f(42))
      la(solution.f(-1) === false, solution.f(-1))
      la(solution.f('11') === true, solution.f('11'))
    })
  })

  describe('R.map(R.is(Number))', () => {
    const input = [1, 2, 'foo', 4]
    const output = [true, true, false, true]

    it('is curried', () => {
      const fn = R.map(R.is(Number))
      la(is.fn(fn), 'is a function')
      const o = fn(input)
      same(o, output, 'invalid map', o)
    })

    it('finds map with right solution', () => {
      const solution = solve(input, output)
      la(is.fn(solution.f))
    })

    it('works', () => {
      const i = [4, 10, null]
      const expected = [true, true, false]
      const solution = solve(input, output)
      const computed = solution.f(i)
      same(computed, expected, 'computed', computed)
    })
  })

  describe('R.map(R.is(String))', () => {
    const input = [1, 2, 'foo', 4]
    const output = [false, false, true, false]

    it('finds map with right solution', () => {
      const solution = solve(input, output)
      la(is.fn(solution.f))
    })

    it('works', () => {
      const i = [4, 10, null, 'foo', 'f']
      const expected = [false, false, false, true, true]
      const solution = solve(input, output)
      const computed = solution.f(i)
      same(computed, expected, 'computed', computed)
    })
  })
})
