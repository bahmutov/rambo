'use strict'

const R = require('ramda')
const produce = require('..').produce
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

describe('R.range', () => {
  describe('R.range(1, 4)', () => {
    it('generates range', () => {
      const o = R.range(1, 4)
      same(o, [1, 2, 3], o)
    })
  })

  describe('finding range [50, 51, 52]', () => {
    const output = [50, 51, 52]
    const solution = produce(output)

    it('has function', () => {
      la(is.fn(solution.f), solution)
    })

    it('produces the range', () => {
      const o = solution.f()
      same(o, output, 'produced', o)
    })
  })

  describe('finding range (1, 4)', () => {
    const output = [1, 2, 3]
    const solution = produce(output)

    it('returns a solution', () => {
      la(solution)
    })

    it('has function', () => {
      la(is.fn(solution.f), solution)
    })

    it('has a name', () => {
      la(is.unemptyString(solution.name), solution)
    })
  })

  describe('finding range (5, 9)', () => {
    const output = [5, 6, 7, 8]
    const solution = produce(output)

    it('returns a solution', () => {
      la(solution)
    })

    it('has function', () => {
      la(is.fn(solution.f), solution)
    })

    it('has a name', () => {
      la(is.unemptyString(solution.name), solution)
    })
  })
})
