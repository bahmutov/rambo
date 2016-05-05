'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../src/is-named')

describe('R.split', () => {
  const input = '/usr/local/bin/node'
  const output = ['', 'usr', 'local', 'bin', 'node']
  const expected = `R.split('/')`

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === expected, solution.name)
  })
})

// TODO add tail like the doc example
// http://ramdajs.com/docs/#split
