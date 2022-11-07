export const curry = fn => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args)
  }
}

export const filter = curry((f, a) => a.filter(f))
export const endsWith = curry((e, s) => s.endsWith(e))
export const replace = curry((a, b, s) => s.replace(a, b))
export const prepend = curry((a, b) => `${a}${b}`)
export const append = curry((a, b) => `${b}${a}`)
export const map = curry((f, a) => a.map(f))
export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

export const filterByExtension = compose(filter, endsWith)
export const prop = propName => obj => obj[propName]
export const head = arr => arr[0]
export const tail = arr => arr[arr.length - 1]
export const identity = x => x
export const mapSeparately = (map1, map2) => ([a, b]) => [map1(a), map2(b)]
export const mapOver = a => map(head(a), tail(a))

export const tap = msg => x => {
  console.log(msg, x)
  return x
}

export const flat = a => a.flat()
