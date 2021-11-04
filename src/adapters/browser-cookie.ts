import {Cookie, Store} from "tough-cookie";

export class BrowserCookieStore implements Store {
  synchronous: boolean;

  findCookie(domain: string, path: string, key: string, cb: (err: (Error | null), cookie: (Cookie | null)) => void): void {
    const decodedCookie = decodeURIComponent(document.cookie)

    decodedCookie.split(';').forEach(c => {
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }

      const name = key + '='
      if (c.indexOf(name) == 0) {
        cb(null, Cookie.parse(c.substring(name.length, c.length)) ?? null)

        return
      }
    });

    cb(null, null)
  }

  findCookies(domain: string, path: string, allowSpecialUseDomain: boolean, cb: (err: (Error | null), cookie: Cookie[]) => void): void {
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookies: Cookie[] = []

    decodedCookie.split(';').forEach(c => {
      const cookie = Cookie.parse(c)

      if (cookie) {
        cookies.push(cookie)
      }
    })

    cb(null, cookies)
  }

  getAllCookies(cb: (err: (Error | null), cookie: Cookie[]) => void): void {
    this.findCookies('', '', false, cb)
  }

  putCookie(cookie: Cookie, cb: (err: (Error | null)) => void): void {
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

export const getCookieStore = () => {
  return new BrowserCookieStore();
}
