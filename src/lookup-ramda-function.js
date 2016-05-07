'use strict'

const R = require('ramda')
const la = require('lazy-ass')
const is = require('check-more-types')

la(R, 'missing R library')

// maybe we can just keep passing around expressions instead of forming functions?
function lookupRamdaFunction (name) {
  la(is.unemptyString(name), 'missing ramda function', name)
  /*eslint-disable no-eval*/
  const f = eval(name)
  la(is.fn(f), 'could not lookup name', name)
  return {
    f: f,
    name: name
  }
}

module.exports = lookupRamdaFunction
