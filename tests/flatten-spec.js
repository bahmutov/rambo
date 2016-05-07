'use strict'

const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const isNamed = require('../src/is-named')

/* global describe, it */
describe('R.flatten', () => {
  const input = [1, [2], [3, [4]]]
  const output = [1, 2, 3, 4]

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === 'R.flatten', solution)
  })
})
