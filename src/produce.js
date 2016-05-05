'use strict'

const la = require('lazy-ass')

function produce (output) {
  la(arguments.length === 1, 'expected single output argument', output)
}

module.exports = produce
