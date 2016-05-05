'use strict'

const R = require('ramda')
const solve = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../src/is-named')

describe('R.has', () => {
  const examples = [
    [{name: 'alice'}, true],
    [{name: 'bob'}, true],
    [{age: 42}, false],
    [{}, false]
  ]
  // should be R.has('name')

  it('finds the solution', () => {
    const solution = solve(examples)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === 'R.has(\'name\')', solution)
  })

  it('solution works', () => {
    const solution = solve(examples)
    const o = solution.f({name: 'john'})
    la(o, 'expected to have name')
  })
})

describe('R.filter(R.has(name))', () => {
  const input = [{foo: 'bar'}, {name: 'alice'}, {name: 'bob'}, {foo: 42}]
  const output = [{name: 'alice'}, {name: 'bob'}]
  const expected = `R.filter(R.has('name'))`

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === expected, solution.name)
  })
})

describe('R.filter(R.has(foo))', () => {
  const input = [{foo: 'bar'}, {name: 'alice'}, {name: 'bob'}, {foo: 42}]
  const output = [{foo: 'bar'}, {foo: 42}]
  const expected = `R.filter(R.has('foo'))`

  it('finds the solution', () => {
    const solution = solve(input, output)
    la(solution, 'returns solution', solution)
    la(isNamed(solution), solution)
    la(is.fn(solution.f), 'finds function')
    la(solution.name === expected, solution.name)
  })
})
