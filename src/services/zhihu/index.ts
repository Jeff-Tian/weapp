import Taro, {ENV_TYPE} from '@tarojs/taro'
import qs from 'qs'

export const loginByQrCode = async (p: { setRichModalTitle: (value: (((prevState: string) => string) | string)) => void; setIsRichModalOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void; setSaveQR: (value: (((prevState: null) => null) | null)) => void; setZhihuLoginQRCode: (value: (((prevState: string) => string) | string)) => void }) => {
  try {
    await qrcodeLogin(p)
  } catch (ex) {
    console.error('ex = ', ex);
  }
}

export const getUrl = (url: string, cookie) => {
  const q = qs.stringify({
    cookie,
    url,
    authority: encodeURIComponent('zhuanlan.zhihu.com'),
    origin: encodeURIComponent('https://zhuanlan.zhihu.com'),
    referer: encodeURIComponent('https://zhuanlan.zhihu.com/write'),
    dataType: `json`,
    format: `json`
  })

  console.log('qs = ', q)

  return Taro.ENV_TYPE.WEB !== Taro.getEnv() ? url : `https://uniheart.pa-ca.me/proxy?${q}`
}

export const qrcodeLogin = async ({setRichModalTitle, setIsRichModalOpen, setZhihuLoginQRCode, setSaveQR}) => {
  const zhihuUdidUrl = 'https://www.zhihu.com/udid'

  const url = Taro.ENV_TYPE.WEB === Taro.getEnv() ? `https://uniheart.pa-ca.me/proxy?dataType=text&url=${encodeURIComponent(zhihuUdidUrl)}&timestamp=${Date.now()}` : zhihuUdidUrl

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

  console.log("token saving...", Taro.setStorage, Taro.setStorageSync, res2)

  Taro.setStorageSync('zhihu-token', res2.data.token);

  console.log('token set')

  const scanInfoUrl = getUrl(`https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/scan_info`, '')

  const queryQrScanInfo = async () => {
    return ENV_TYPE.WEB !== Taro.getEnv() ? await Taro.request({
      url: scanInfoUrl,
      dataType: 'json'
    }) : await queryQrScanInfoByProxy()
  }

  const queryQrScanInfoByProxy = async () => {
    const res11 = await Taro.request({
      url: scanInfoUrl,
      dataType: 'json'
    })

    console.log('res of proxy = ', res11)

    return {
      data: {...JSON.parse(res11.data.raw)},
      headers: res11.data.headers,
      cookies: res11.data.headers['set-cookie'],
      header: res11.data.headers,
    }
  }

  const poll = async () => {
    try {
      const res3 = await queryQrScanInfo()

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
          if (res3.cookies) {
            Taro.setStorage({
              key: 'set-cookie',
              data: originalCookie.concat(res3.cookies)
            })
          }
        } else {
          Taro.setStorage({
            key: 'set-cookie',
            data: originalCookie.concat(res3.cookies ?? []).concat([res3.header['set-cookie']]).concat([res3.header['Set-Cookie']])
          })
        }

        Taro.setStorageSync('zhihu-user-info', res3.data)

        Taro.showToast({title: 'Cookie 设置成功', icon: 'success', duration: 2000})
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
  })
}
