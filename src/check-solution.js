'use strict'

const R = require('ramda')
const la = require('lazy-ass')
const is = require('check-more-types')

function test (input, output, fn) {
  try {
    const o = fn(input)
    // console.log('comparing', o, 'with expected', output)
    return R.equals(o, output)
  } catch (err) {
    return false
  }
}

function testProduces (output, fn) {
  try {
    const o = fn()
    return R.equals(o, output)
  } catch (err) {
    return false
  }
}

function testApply (input, output, fn) {
  if (is.not.array(input)) {
    return false
  }

  try {
    const o = fn.apply(null, input)
    // console.log('comparing', o, 'with expected', output)
    return R.equals(o, output)
  } catch (err) {
    return false
  }
}

function testExamples (tester, examples, fn) {
  la(is.fn(tester), 'missing tester function')
  if (is.not.fn(fn)) {
    return false
  }

  la(is.array(examples), 'invalid examples', examples)
  return examples.every((example) => {
    la(is.array(example) && example.length === 2, 'invalid example', example)
    // console.log('testing example', example[0], example[1])
    return tester(example[0], example[1], fn)
  })
}

module.exports = {
  test: test,
  testApply: testApply,
  testExamples: testExamples,
  testProduces: testProduces
}
