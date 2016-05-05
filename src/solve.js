'use strict'

const R = require('ramda')
const la = require('lazy-ass')
const is = require('check-more-types')
const {test, testApply, testExamples} = require('./check-solution')
const isNamed = require('./is-named')
const grab = require('./grab')
const isPair = require('./is-pair')

/*eslint-disable no-eval*/

// maybe we can just keep passing around expressions instead of forming functions?
function lookupR (name) {
  la(is.unemptyString(name), 'missing ramda function', name)
  const f = eval(name)
  la(is.fn(f), 'could not lookup name', name)
  return {
    f: f,
    name: name
  }
}

// const i = [1, 2, 3]
// // const o = [2, 3, 4]
// const o = [11, 12, 13]

// const fns = _.values(_)
// TODO handle multiple solutions better
// const fns = [R.add, _.subtract, _.map]
// const fns = [_.uniq, _.add]
// const fns = [_.zipObject]
// console.log('_.zipObject arity', _.zipObject.length)
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
const halfN = 10
const firstValues = R.range(0, halfN * 2).map((x) => x - halfN)

function solve (examples) {
  if (arguments.length === 2) {
    // passed single example as separate input / output
    examples = [[arguments[0], arguments[1]]]
  // console.log(examples)
  }

  function derivedFunctions (examples, f) {
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

  const allSimpleDerivedFunctions = simpleFunctions.reduce((prev, f) => {
    return prev.concat(derivedFunctions(examples, f))
  }, [])

  var found
  // try to apply just a function
  fns.some((fn) => {
    la(isNamed(fn), fn)
    if (testExamples(test, examples, fn.f)) {
      found = fn
      return true
    }
  })
  if (found) {
    return found
  }

  // try derived functions
  fns.some((fn) => {
    const derived = derivedFunctions(examples, fn)
    la(is.array(derived),
      'could not get list of derived functions from', fn, 'got', derived)

    // console.log('testing functions')
      // console.log(R.map(R.prop('name'))(derived))

    return derived.some((fder) => {
      la(isNamed(fder), 'invalid derived function', fder, 'from', fn)
      // console.log(fder.name, examples[0][0], fder.f(examples[0][1]))
      // console.log('trying', fder.name)
      if (testExamples(test, examples, fder.f)) {
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
    if (testExamples(testApply, examples, fn)) {
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
