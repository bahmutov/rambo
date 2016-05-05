'use strict'

const R = require('ramda')
const la = require('lazy-ass')
const is = require('check-more-types')
const isNamed = require('./is-named')
const grab = require('./grab')
const isPair = require('./is-pair')

const halfN = 10
const firstValues = R.range(0, halfN * 2).map((x) => x - halfN)

function deriveFunctions (examples, f, allSimpleDerivedFunctions) {
  la(is.array(examples), 'missing examples', examples)
  la(isNamed(f), 'not a named function', f)
  la(is.fn(f.f), 'expected function to derive', f)

  // derived functions specific
  // TODO use Symbol
  if (f.f === R.is) {
    return [{
      f: R.is(Number),
      name: 'R.is(Number)'
    }, {
      f: R.is(Object),
      name: 'R.is(Object)'
    }, {
      f: R.is(String),
      name: 'R.is(String)'
    }]
  }
  if (f.f === R.map || f.f === R.filter) {
    // TODO replace with compose
    return allSimpleDerivedFunctions.map((df) => {
      la(isNamed(df), 'not a named function', df)
      return {
        f: f.f(df.f),
        name: `${f.name}(${df.name})`
      }
    })
  }

  if (f.f === R.add || f.f === R.subtract || f.f === R.gt) {
    // binary functions
    const outsideData = firstValues.map((x) => {
      return {
        f: f.f(x),
        name: `${f.name}(${x})`
      }
    })

    const asSpread = [{
      f: R.apply(f.f),
      name: `R.apply(${f.name})`,
      spread: true
    }]

    const pairs = grab.numberPairs(examples)
    const guessesFromData = pairs.map((x) => {
      la(isPair(x), 'invalid number pair', x)
      // since we have both arguments for binary function, it evaluates
      // right away, thus create dummy function around it
      return {
        f: R.always(f.f(x[0], x[1])),
        name: `${f.name}(${x[0]}, ${x[1]})`
      }
    })
    return asSpread.concat(guessesFromData).concat(outsideData)
  // return guessesFromData
  }

  if (f.f === R.has) {
    const propertyNames = grab.properties(examples)
    la(is.array(propertyNames), 'could not grab property names from', examples)
    return propertyNames.map((property) => {
      return {
        f: f.f(property),
        name: `${f.name}('${property}')`
      }
    })
  }

  if (f.f === R.append) {
    const allValues = grab.everything(examples)
    la(is.array(allValues), 'could not grab values from', examples)
    return allValues.map((value) => {
      const s = is.string(value) ? `'${value}'` : value
      return {
        f: f.f(value),
        name: `${f.name}(${s})`
      }
    })
  }

  if (f.f === R.split) {
    const strings = grab.strings(examples)

    la(is.array(strings), 'expected list of strings from', examples, strings)
    const characters = R.uniq(strings.join('').split(''))
    // console.log('characters', characters)
    return characters.map((sep) => {
      return {
        f: f.f(sep),
        name: `${f.name}('${sep}')`
      }
    })
  }

  return []
}

module.exports = deriveFunctions
