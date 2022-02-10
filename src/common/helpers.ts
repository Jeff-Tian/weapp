export const memoizeAsync = <T>(func: (...args) => Promise<T>) => {
  const cache = {}

  console.log('cache = ', cache)
  return async (...args) => {
    const cacheKey = JSON.stringify({fn: func.name, args})


    console.log('cache KEY = ', cache, cacheKey)
    if (cache[cacheKey] === undefined) {
      cache[cacheKey] = func(...args).finally(() => (cache[cacheKey] = undefined))
    }

    return cache[cacheKey]
  }
}

export const memoize = (fn: Function) => {
  const cache: Record<string, object> = {};

  return (...args: any[]) => {
    const key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = fn(...args);
    }

    return cache[key]
  }
}

export const memoizedAsync = memoizeAsync(memoizeAsync as any)
export const memoized = memoize(memoize)
