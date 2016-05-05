'use strict'

const is = require('check-more-types')
const isNamed = is.schema({
  f: is.fn,
  name: is.unemptyString
})

module.exports = isNamed
