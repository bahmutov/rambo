'use strict'

const R = require('ramda')
const is = require('check-more-types')
const isPair = require('./is-pair')
const allNumbers = is.arrayOf.bind(null, is.number)

function grabNumbers (things) {
  return R.uniq(R.flatten(things).filter(R.is(Number)))
}

function grabNumberPairs (things) {
  var pairs = []
  if (!is.array(things)) {
    return pairs
  }

  things.forEach((x) => {
    if (isPair(x) && allNumbers(x)) {
      return pairs.push(x)
    }
    if (is.array(x)) {
      const xPairs = grabNumberPairs(x)
      pairs = pairs.concat(xPairs)
    }
  })
  return pairs
}

function grabEverything (things) {
  return R.uniq(R.flatten(things))
}

function grabProperties (things) {
  const objects = R.filter(R.is(Object), R.flatten(things))
  const keys = R.uniq(R.flatten(R.map(R.keys, objects)))
  return keys
}

function grabStrings (things) {
  const strings = R.flatten(R.filter(R.is(String), R.flatten(things)))
  return strings
}

module.exports = {
  numbers: grabNumbers,
  everything: grabEverything,
  properties: grabProperties,
  strings: grabStrings,
  numberPairs: grabNumberPairs
}
