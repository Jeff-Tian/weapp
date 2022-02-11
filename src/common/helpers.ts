export const memoizeAsync = <T>(func: (...args) => Promise<T>) => {
  const cache = {}

  return async (...args) => {
    const cacheKey = JSON.stringify({fn: func.name, args})

    if (cache[cacheKey] === undefined) {
      cache[cacheKey] = func(...args).finally(() => (cache[cacheKey] = undefined))
    }

    return cache[cacheKey]
  }
}

export const memoize = (fn: Function): Function => {
  const cache: Record<string, object> = {};

  return (...args: any[]) => {
    const key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = fn(...args);
    }

    return cache[key]
  }
}

export const memoizedAsync = memoize(memoizeAsync)
export const memoized = memoize(memoize)
