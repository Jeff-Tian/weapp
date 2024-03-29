import {Cookie, CookieJar, Store} from "tough-cookie";

type FindCookiesCallback = (err: (Error | null), cookie: Cookie[]) => void

export class BrowserCookieStore implements Store {
  synchronous: boolean;

  findCookie(domain: string, path: string, key: string, cb: (err: (Error | null), cookie: (Cookie | null)) => void): void {
    const decodedCookie = decodeURIComponent(document.cookie)

    decodedCookie.split(';').forEach(c => {
      while (c.startsWith(' ')) {
        c = c.substring(1)
      }

      const name = key + '='
      if (c.startsWith(name)) {
        cb(null, Cookie.parse(c.substring(name.length, c.length)) ?? null)
      }
    });

    cb(null, null)
  }

  findCookies(domain: string, path: string, cb: FindCookiesCallback): void
  findCookies(domain: string, path: string, allowSpecialUseDomain: boolean, cb: FindCookiesCallback): void
  findCookies(domain: string, path: string, allowSpecialUseDomain: boolean | FindCookiesCallback, cb?: FindCookiesCallback): void {
    if (!cb) {
      cb = allowSpecialUseDomain as FindCookiesCallback
    }

    const decodedCookie = decodeURIComponent(document.cookie)
    const cookies: Cookie[] = []

    decodedCookie.split(';').forEach(c => {
      const cookie = Cookie.parse(c)

      if (cookie) {
        if (domain && path) {
          if (cookie.domain === domain && cookie.path === path) {
            cookies.push(cookie)
          }
        } else {
          cookies.push(cookie)
        }
      }
    })

    cb(null, cookies)
  }

  getAllCookies(cb: (err: (Error | null), cookie: Cookie[]) => void): void {
    this.findCookies('', '', false, cb)
  }

  putCookie(cookie: Cookie, cb: (err: (Error | null)) => void): void {
    console.log('put cookie = ', cookie);
    document.cookie = cookie.toString()

    cb(null)
  }

  removeCookie(domain: string, path: string, key: string, cb: (err: (Error | null)) => void): void {
    this.getAllCookies((_, allCookies) => {
      allCookies.forEach(c => {
        if (c.key === key) {
          document.cookie = `${c.key}=${c.value};max-age=0;`
        }
      })

      cb(null)
    });
  }

  removeCookies(domain: string, path: string, cb: (err: (Error | null)) => void): void {
    this.getAllCookies((_, allCookies) => {
      allCookies.forEach(c => {
        document.cookie = `${c.key}=${c.value};max-age=0`
      })

      cb(null)
    })
  }

  updateCookie(oldCookie: Cookie, newCookie: Cookie, cb: (err: (Error | null)) => void): void {
    this.removeCookie('', '', oldCookie.key, () => {
      this.putCookie(newCookie, () => {
        cb(null)
      })
    })
  }

}

const cookieStore = new BrowserCookieStore()
cookieStore.synchronous = true;

export const getCookieStore = () => {
  return cookieStore
}

export const clearCookieStore = () => {
  cookieStore.removeCookies('', '', () => {
  })
  return cookieStore
}

export const getCookieJar = () => {
  return new CookieJar(cookieStore)
}
