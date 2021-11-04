/**
 * @jest-environment jsdom
 */

import {Cookie} from "tough-cookie";
import * as assert from "assert";
import {BrowserCookieStore} from "../../src/adapters/browser-cookie";


describe('Browser Cookie Store', () => {
  const sut = new BrowserCookieStore()

  it('finds cookie', (done) => {
    sut.findCookie("test", "test", "key", (_err: Error | null, cookie: Cookie | null) => {
      expect(cookie).toEqual(null);

      done()
    });
  })

  it('finds cookies', (done) => {
    sut.findCookies("test", "test", false, (_err: Error | null, cookies: Cookie[] | null) => {
      expect(cookies).toBeDefined()
      expect(cookies!.length).toEqual(0)

      done()
    });
  })

  it('gets all cookies', (done) => {
    sut.getAllCookies((_err: Error | null, cookies: Cookie[]) => {
      expect(cookies.length).toEqual(0)

      done()
    })
  })

  it('puts cookie', (done) => {
    sut.putCookie(Cookie.parse("foo=bar")!, (err: Error | null) => {
      expect(err).toEqual(null)

      sut.getAllCookies((_err, cookies) => {
        expect(cookies.length).toEqual(1)

        sut.putCookie(Cookie.parse("joe=doe")!, (err2) => {
          expect(err2).toEqual(null)

          sut.getAllCookies((_, allCookies) => {
            expect(allCookies.length).toEqual(2)
          })
        })

        done()
      })
    })

  })

  it('removes cookie', (done) => {
    sut.getAllCookies((_err, cookies) => {
      expect(cookies.length).toEqual(2)

      sut.removeCookie('', '', 'foo', (err2) => {
        expect(err2).toEqual(null)

        sut.getAllCookies((_, allCookies) => {
          expect(allCookies.length).toEqual(1)

          done()
        })
      })
    })
  })

  it('removes all cookies', (done) => {
    sut.getAllCookies((_err, cookies) => {
      expect(cookies.length).toEqual(1)

      sut.removeCookies('', '', () => {
        sut.getAllCookies((_, allCookies) => {
          expect(allCookies.length).toEqual(0);

          done();
        })
      })
    })
  })

  it('update cookie', (done) => {
    const cookie = Cookie.parse(`foo=bar`)
    assert.ok(cookie)

    sut.putCookie(cookie, () => {
      sut.getAllCookies((_, allCookies) => {
        expect(allCookies.length).toEqual(1)
        expect(document.cookie).toEqual(`foo=bar`)

        const newCookie = Cookie.parse(`foo=doe`)
        assert.ok(newCookie)

        sut.updateCookie(cookie, newCookie, () => {
          expect(document.cookie).toEqual(`foo=doe`)
          done()
        })
      })
    })
  })

})
