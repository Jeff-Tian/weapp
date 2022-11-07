const curry = fn => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args)
  }
}
module.exports.curry = curry

const filter = curry((f, a) => a.filter(f))
module.exports.filter = filter


const endsWith = curry((e, s) => s.endsWith(e))
module.exports.endsWith = endsWith


const replace = curry((a, b, s) => s.replace(a, b))
module.exports.replace = replace


const prepend = curry((a, b) => `${a}${b}`)
module.exports.prepend = prepend

const append = curry((a, b) => `${b}${a}`)
module.exports.append = append

const map = curry((f, a) => a.map(f))
module.exports.map = map;


const compose = (...fns) => curry((...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0])
module.exports.compose = compose

const filterByExtension = compose(filter, endsWith)
module.exports.filterByExtension = filterByExtension


const prop = propName => obj => obj[propName]
module.exports.prop = prop


const head = arr => arr[0]
module.exports.head = head


const tail = arr => arr[arr.length - 1]
module.exports.tail = tail;


const identity = x => x
module.exports.identity = identity;


const mapSeparately = (map1, map2) => ([a, b]) => [map1(a), map2(b)]
module.exports.mapSeparately = mapSeparately;


const mapOver = a => map(head(a), tail(a))
module.exports.mapOver = mapOver;

const tap = msg => x => {
  console.log(msg, x)
  return x
}
module.exports.tap = tap;

const flat = a => a.flat()
module.exports.flat = flat;

const duplicate = a => [a, a]
module.exports.duplicate = duplicate;
