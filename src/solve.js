'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const check = require('./check-solution')
const isNamed = require('./is-named')
const lookupR = require('./lookup-ramda-function')
const derivedFunctions = require('./derive-functions')

const simpleFunctions = [
  'R.is',
  'R.add', 'R.subtract',
  'R.gt',
  'R.flatten', 'R.fromPairs', 'R.has',
  'R.split', 'R.tail', 'R.append'
].map(lookupR)
const iterators = [
  'R.map', 'R.filter'
]
const iteratorFunctions = iterators.map(lookupR)

const fns = simpleFunctions.concat(iteratorFunctions)

function solve (examples) {
  if (arguments.length === 2) {
    // passed single example as separate input / output
    examples = [[arguments[0], arguments[1]]]
  // console.log(examples)
  }

  var allSimpleDerivedFunctions = []

  allSimpleDerivedFunctions = simpleFunctions.reduce((prev, f) => {
    return prev.concat(derivedFunctions(examples, f, allSimpleDerivedFunctions))
  }, [])

  var found
  // try to apply just a function
  fns.some((fn) => {
    la(isNamed(fn), fn)
    if (check.testExamples(check.test, examples, fn.f)) {
      found = fn
      return true
    }
  })
  if (found) {
    return found
  }

  // try derived functions
  fns.some((fn) => {
    const derived = derivedFunctions(examples, fn, allSimpleDerivedFunctions)
    la(is.array(derived),
      'could not get list of derived functions from', fn, 'got', derived)

    // console.log('testing functions')
      // console.log(R.map(R.prop('name'))(derived))

    return derived.some((fder) => {
      la(isNamed(fder), 'invalid derived function', fder, 'from', fn)
      // console.log(fder.name, examples[0][0], fder.f(examples[0][1]))
      // console.log('trying', fder.name)
      if (check.testExamples(check.test, examples, fder.f)) {
        found = fder
        return true
      }
    })
  })
  if (found) {
    return found
  }

  // maybe applying inputs as separate arguments works
  fns.some((fn) => {
    la(isNamed(fn), 'invalid named for spread', fn)
    // console.log('testing spread over', fn.name)
    if (check.testExamples(check.testApply, examples, fn)) {
      // found = R.spread(fn)
      found = fn
      // console.log('fn', fn.name)
      return true
    }
  })
  if (found) {
    return found
  }
}

module.exports = solve
