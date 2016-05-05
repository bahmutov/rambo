'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../is-named')

describe('R.tail', () => {
  const input = [[1], [2], [3]]
  const output = [[2], [3]]
  const expected = `R.tail`

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === expected, solution.name)
  })
})
