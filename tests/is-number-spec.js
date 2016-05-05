'use strict'

const R = require('ramda')
const lobot = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

describe('R.is(Number)', () => {
  describe('single level, multiple inputs', () => {
    const examples = [[1, true], [5, true], ['foo', false]]
    const solution = lobot(examples)

    it('finds solution from the examples', () => {
      la(is.fn(solution), 'found solution function')
    })

    it('works on other numbers', () => {
      la(solution(42) === true, solution(42))
      la(solution(-1) === true, solution(-1))
      la(solution(11) === true, solution(11))
    })

    it('works on null', () => {
      la(solution(null) === false, solution(null))
    })
  })

  describe('single level, multiple inputs for String', () => {
    const examples = [[1, false], [5, false], ['foo', true]]
    const solution = lobot(examples)

    it('finds solution from the examples', () => {
      la(is.fn(solution), 'found solution function')
    })

    it('works on other numbers', () => {
      la(solution(42) === false, solution(42))
      la(solution(-1) === false, solution(-1))
      la(solution('11') === true, solution('11'))
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
      const solution = lobot(input, output)
      la(is.fn(solution))
    })

    it('works', () => {
      const i = [4, 10, null]
      const expected = [true, true, false]
      const solution = lobot(input, output)
      const computed = solution(i)
      same(computed, expected, 'computed', computed)
    })
  })

  describe('R.map(R.is(String))', () => {
    const input = [1, 2, 'foo', 4]
    const output = [false, false, true, false]

    it('finds map with right solution', () => {
      const solution = lobot(input, output)
      la(is.fn(solution))
    })

    it('works', () => {
      const i = [4, 10, null, 'foo', 'f']
      const expected = [false, false, false, true, true]
      const solution = lobot(input, output)
      const computed = solution(i)
      same(computed, expected, 'computed', computed)
    })
  })
})
