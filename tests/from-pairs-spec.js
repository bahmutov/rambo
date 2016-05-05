'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../is-named')

describe('R.fromPairs', () => {
  const input = [['a', 1], ['b', 2],  ['c', 3]]
  const output = {a: 1, b: 2, c: 3}

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === 'R.fromPairs', solution)
  })
})
