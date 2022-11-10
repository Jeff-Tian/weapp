import qs from 'querystring'

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

export const tail = a => a[a.length - 1]

export const getUrlQuerySeparator = url => url.lastIndexOf('?') >= 0 ? '&' : '?'

export const appendUrlQuery = (url, query) => {
  const separator = getUrlQuerySeparator(url)
  return url + separator + query
}

export const getCurrentPageUrl = (router) => {
  const path = router.path
  const pathWithoutQuery = path.split('?')[0]
  const query = router.params

  return `https://taro.pa-ca.me${pathWithoutQuery}?${qs.stringify(query)}`
}
