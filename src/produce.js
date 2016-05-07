'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const lookupR = require('./lookup-ramda-function')
const isNamed = require('./is-named')
const testProduces = require('./check-solution').testProduces
const R = require('ramda')

const simpleFunctions = [
  'R.range'
].map(lookupR)
const fns = simpleFunctions

function deriveRange (output) {
  if (is.not.array(output)) {
    return
  }
  if (is.empty(output)) {
    return
  }
  if (!output.every(is.number)) {
    return
  }
  const first = output[0]
  const last = R.last(output)
  la(is.number(last), 'invalid last element in list', output)
  const after = last + 1
  return {
    f: R.always(R.range(first, after)),
    name: `R.range(${first}, ${after})`
  }
}

function deriveProducer (output, f) {
  la(isNamed(f), 'not a named function', f)

  if (f.f === R.range) {
    const d = deriveRange(output)
    if (isNamed(d)) {
      return [d]
    }
  }

  return []
}

function produce (output) {
  la(arguments.length === 1, 'expected single output argument', output)

  const derived = R.flatten(fns.map((f) => deriveProducer(output, f)))
  const all = fns.concat(derived)

  var found
  // try to apply just a function
  all.some((fn) => {
    la(isNamed(fn), fn)
    if (testProduces(output, fn.f)) {
      found = fn
      return true
    }
  })
  if (found) {
    return found
  }
}

module.exports = produce
