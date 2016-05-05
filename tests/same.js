'use strict'

const _ = require('lodash/fp')
const la = require('lazy-ass')

const same = function (a, b) {
  const info = _.toArray(arguments).slice(2)
  la.apply(null, [_.isEqual(a, b)].concat(info))
}

module.exports = same
