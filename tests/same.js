'use strict'

const R = require('ramda')
const la = require('lazy-ass')

const same = function (a, b) {
  const info = Array.from(arguments).slice(2)
  la.apply(null, [R.equals(a, b)].concat(info))
}

module.exports = same
