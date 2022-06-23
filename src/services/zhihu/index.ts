import {gql} from '@apollo/client'
import Taro from '@tarojs/taro'

export const SYNC_YUQUE_TO_ZHIHU = gql`
mutation SyncYuqueToZhihu($syncYuqueToZhihuSlug2: String!) {
  syncYuqueToZhihu(slug: $syncYuqueToZhihuSlug2) {
    slug
  }
}`

export const draftDirectly = async (title, content) => {
  return await draftColumn(title, content)
}

export const loginByQrCode = async (p: { setRichModalTitle: (value: (((prevState: string) => string) | string)) => void; setIsRichModalOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void; setSaveQR: (value: (((prevState: null) => null) | null)) => void; setZhihuLoginQRCode: (value: (((prevState: string) => string) | string)) => void }) => {
  console.log('login...')

  try {
    await qrcodeLogin(p)
  } catch (ex) {
    console.error('ex = ', ex);
  }
}

export const draftColumn = async (title, content) => {
  const cookie = (Taro.getStorageSync('set-cookie') || []).map(item => item.split(';')[0]).join(';')

  if (!cookie) {
    await Taro.showToast({
      title: '发布失败，请先登录后再试',
      duration: 3000,
      icon: 'none'
    })

    return
  }

  console.log("publish with cookie: ", cookie);

  const draftUrl = getUrl('https://zhuanlan.zhihu.com/api/articles/drafts', cookie)

  const res = await Taro.request({
    url: draftUrl,
    method: 'POST',
    dataType: 'json',
    data: {title, content, 'delta-time': 0},
    header: {
      'authority': 'zhuanlan.zhihu.com',
      'origin': 'https://zhuanlan.zhihu.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://zhuanlan.zhihu.com/write',
      'x-requested-with': 'fetch',
      cookie
    }
  })

  console.log('res = ', res);

  if (res.statusCode === 401) {
    Taro.showToast({
      title: `可能上次登录未完成，或者登录已过期，请重新登录后再试。  知乎反馈：${res.data.error.message}`,
      icon: 'none',
      duration: 5000
    }).then()
  }
}


export const getUrl = (url: string, cookie) => {
  return Taro.ENV_TYPE.WEB !== Taro.getEnv() ? url : `https://uniheart.pa-ca.me/proxy?cookie=${cookie}&url=${url}&authority=${encodeURIComponent('zhuanlan.zhihu.com')}&origin=${encodeURIComponent('https://zhuanlan.zhihu.com')}&referer=${encodeURIComponent('https://zhuanlan.zhihu.com/write')}&dataType=json`
}

export const qrcodeLogin = async ({setRichModalTitle, setIsRichModalOpen, setZhihuLoginQRCode, setSaveQR}) => {
  const zhihuUdidUrl = 'https://www.zhihu.com/udid'

  // 该请求不需要经过 Cloudflare CDN
  const url = Taro.ENV_TYPE.WEB === Taro.getEnv() ? `https://uniheart.herokuapp.com/proxy?dataType=text&url=${encodeURIComponent(zhihuUdidUrl)}&timestamp=${Date.now()}` : zhihuUdidUrl

  const res = await Taro.request({
    mode: 'cors',
    url,
    method: 'POST',
    dataType: 'text',
    responseType: 'text',
    header: {
      'content-type': `text/plain`,
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    Taro.setStorage({
      key: 'set-cookie',
      data: JSON.parse(res.data).headers['set-cookie']
    })
  } else {
    console.log('setting cookie!')

    Taro.setStorage({
      key: 'set-cookie',
      data: (res.cookies ?? []).concat([res.header['set-cookie']]).concat([res.header['Set-Cookie']])
    })
  }

  const cookie = Taro.getStorageSync('set-cookie').map(item => item.split(';')[0]).join(';')

  const qrcodeUrl = getUrl('https://www.zhihu.com/api/v3/account/api/login/qrcode', cookie)

  console.log("cookie=", Taro.getStorageSync('set-cookie'));


  const res2 = await Taro.request({
    url: qrcodeUrl,
    method: 'POST',
    dataType: 'json',
    header: {
      'content-type': `application/json`,
      'X-Requested-With': 'XMLHttpRequest',
      cookie
    },
  })

  console.log('res2 = ', res2);

  if (!res2.data.token) {
    console.log('res2.data.token = ', res2.data);

    Taro.showToast({
      title: res2.data.message || '登录失败',
      icon: 'none',
      duration: 2000
    })

    return;
  }

  console.log("token saving...")

  Taro.setStorageSync('zhihu-token', res2.data.token);

  const scanInfoUrl = getUrl(`https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/scan_info`, '')

  const poll = async () => {
    try {
      const res3 = await Taro.request({
        url: scanInfoUrl,
        dataType: 'json',
      })

      if (res3.data.status === 0) {
        Taro.showToast({title: '还未扫码'})
        await poll();
      }

      if (res3.data.status === 1) {
        Taro.showToast({title: '扫码成功', icon: 'success', duration: 2000})

        await poll();
      }

      if (!!res3.data.user_id) {
        Taro.showToast({title: '登录成功', icon: 'success', duration: 2000})

        const originalCookie = Taro.getStorageSync('set-cookie')

        if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
          Taro.setStorage({
            key: 'set-cookie',
            data: originalCookie.concat(Object.keys(res3.data.cookie).map(key => `${key}=${res3.data.cookie[key]}`))
          })
        } else {
          Taro.setStorage({
            key: 'set-cookie',
            data: originalCookie.concat(res3.cookies ?? []).concat([res3.header['set-cookie']]).concat([res3.header['Set-Cookie']])
          })
        }

        Taro.setStorageSync('zhihu-user-info', res3.data)

        Taro.showToast({title: 'Cookie 设置成功', icon: 'success', duration: 2000})
        console.log('now cookie = ', Taro.getStorageSync('set-cookie'));
      }
    } catch (err) {
      console.error('err = ', err);
      Taro.showToast({title: `发生错误了： ${JSON.stringify(err)}`})
    }
  }

  const imgUrl = `https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/image`;
  setZhihuLoginQRCode(imgUrl)


  const message = Taro.ENV_TYPE.WEB === Taro.getEnv() ? '请使用知乎 APP 扫码登录。' : '保存知乎二维码到相册，然后使用知乎 APP 扫码登录。'

  setRichModalTitle(message)
  setIsRichModalOpen(true)
  setSaveQR(() => () => {
    console.log('saving...')

    poll()

    Taro.ENV_TYPE.WEB !== Taro.getEnv() &&

    Taro.getSetting({
      success: () => {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            console.log('authorized')
            Taro.downloadFile({
              url: imgUrl,
              success: (downloaded) => {
                Taro.saveImageToPhotosAlbum({
                  filePath: downloaded.tempFilePath,
                  success: () => {

                    Taro.showToast({
                      title: '二维码已经保存到相册，请打开知乎 APP 进行扫码。',
                      icon: 'success'
                    })
                  }
                })

              }
            })
          }
        })
      }
    })
  }).catch(console.error)
}
