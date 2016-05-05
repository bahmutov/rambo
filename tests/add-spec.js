'use strict'

const R = require('ramda')
const rabot = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')
const isNamed = require('../is-named')

describe.only('R.add(1)', () => {
  describe('adds multiple inputs', () => {
    const examples = [[1, 2], [5, 6]]
    const solution = rabot(examples)

    it('finds solution from the examples', () => {
      la(isNamed(solution))
      la(is.fn(solution.f))
    })

    it('has description', () => {
      la(is.unemptyString(solution.name), solution)
    })

    it('has right description', () => {
      const expected = 'R.add(1)'
      const s = solution.name
      la(s === expected, 'wrong human description', s)
    })

    it('works on example', () => {
      la(solution.f(1) === 2, solution.f(1))
    })

    it('control', () => {
      const i = 10
      const o = 11
      const computed = solution.f(i)
      same(computed, o, computed)
    })
  })

  describe('R.map(R.add(4))', () => {
    const input = [1, 2, 3, 4]
    const output = [5, 6, 7, 8]

    it('is curried', () => {
      const fn = R.map(R.add(4))
      la(is.fn(fn))
      const o = fn(input)
      same(o, output, 'invalid map', o)
    })

    it('finds map with right solution', () => {
      const solution = rabot(input, output)
      la(solution, 'returns solution', solution)
      la(isNamed(solution), solution)
      la(is.fn(solution.f), 'finds function')
    })

    it('finds correct solution name', () => {
      const expected = 'R.map(R.add(4))'
      const solution = rabot(input, output)
      la(solution.name === expected, solution)
    })

    it('can evaluate the solution name', () => {
      const solution = rabot(input, output)
      la(is.unemptyString(solution.name), solution)
      const f = eval(solution.name)
      la(is.fn(f), 'not a function from', solution.name)
      const o = f(input)
      la(is.array(o), 'output not an array', o)
      same(o, output, 'wrong output', o)
    })
  })
})
