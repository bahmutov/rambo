'use strict'

const _ = require('lodash/fp')
const lobot = require('..').solve
const la = require('lazy-ass')
const is = require('check-more-types')
const same = require('./same')

describe('lobot', () => {
  it('is a function', () => {
    la(is.fn(lobot))
  })

  it('_.subtract is curried in lodash/fp', () => {
    const sub5 = _.subtract(5)
    la(is.fn(sub5))
    const result = sub5(6)
    la(result === -1, result)
  })

  it('_.add is curried in lodash/fp', () => {
    const add5 = _.add(5)
    la(is.fn(add5))
    la(add5(6) === 11)
  })
})

describe('add multiple inputs', () => {
  const examples = [[1, 2], [5, 6]]
  const solution = lobot(examples)

  it('finds solution from the examples', () => {
    la(is.fn(solution))
  })

  it('works on example', () => {
    la(solution(1) === 2, solution(1))
  })

  it('control', () => {
    const i = 10
    const o = 11
    const computed = solution(i)
    la(_.isEqual(computed, o), computed)
  })
})

// TODO implement method-specific search
// for example for _.get inspect the input object
// and try all object property permutations
describe.skip('get', () => {
  const input = {foo: {bar: 42}}
  const output = 42
  const solution = lobot(input, output)

  it('finds solution from the examples', () => {
    la(is.fn(solution))
  })

  it('works on example', () => {
    same(solution(input), output, solution(input))
  })

  it('works on control', () => {
    const o = {foo: {bar: 50}}
    same(solution(o), 50, 'got correct deep value', solution(o))
  })

  it.skip('works on control', () => {
    same(solution([10, 6]), true, solution([10, 6]))
    same(solution([6, 10]), false, solution([6, 10]))
    same(solution([6, 6]), false, solution([6, 6]))
  })
})

describe('uniq', () => {
  const input = [2, 1, 2]
  const output = [2, 1]
  const solution = lobot(input, output)

  it('works', () => {
    const o = _.uniq(input)
    // console.log('o', o)
    la(_.isEqual(o, output))
  })

  it('finds solution from the examples', () => {
    la(is.fn(solution), 'found function solution')
  })

  it('works on example', () => {
    const o = solution(input)
    la(_.isEqual(o, output), o)
  })
})

describe('zipObject', () => {
  const input = [['a', 'b'], [1, 2]]
  const output = { 'a': 1, 'b': 2 }
  const solution = lobot(input, output)

  it('works', () => {
    const o = _.zipObject.apply(null, input)
    la(_.isEqual(o, output))
  })

  it('finds solution from the examples', () => {
    la(is.fn(solution), 'found function solution', solution)
  })

  it('works on example', () => {
    const o = solution(input)
    same(o, output, o)
  })

  it('control', () => {
    const i = [['foo'], [42]]
    const o = {foo: 42}
    const computed = solution(i)
    same(computed, o, computed)
  })
})

describe.skip('add', () => {
  const i = 1
  const o = 2
  const solution = lobot(i, o)

  it('examples', () => {
    la(is.fn(solution))
    same(solution(i), o)
  })

  it('control', () => {
    const i = 10
    const o = 11
    const computed = solution(i)
    same(computed, o, computed)
  })
})

describe('castArray', () => {
  const input = 1
  const output = [1]
  const solution = lobot(input, output)

  it('finds solution from the examples', () => {
    la(is.fn(solution))
  })

  it('works on example', () => {
    same(solution(input), output)
  })

  it('control', () => {
    same(solution(null), [null], solution(null))
    same(solution('abc'), ['abc'], solution('abc'))
  })
})
