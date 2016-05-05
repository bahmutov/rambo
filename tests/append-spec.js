'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../src/is-named')

describe('R.append', () => {
  describe('R.append(42)', () => {
    const input = ['foo', 'bar']
    const output = ['foo', 'bar', 42]
    const expected = `R.append(42)`

    it('finds the solution', () => {
      const solution = solve(input, output)
      la(solution, 'returns solution', solution)
      la(isNamed(solution), solution)
      la(is.fn(solution.f), 'finds function')
      la(solution.name === expected, solution.name)
    })
  })

  describe(`R.append('last')`, () => {
    const input = ['foo', 'bar']
    const output = ['foo', 'bar', 'last']
    const expected = `R.append('last')`

    it('finds the solution', () => {
      const solution = solve(input, output)
      la(solution, 'returns solution', solution)
      la(isNamed(solution), solution)
      la(is.fn(solution.f), 'finds function')
      la(solution.name === expected, solution.name)
    })
  })
})
