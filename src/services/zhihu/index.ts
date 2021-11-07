import Taro from '@tarojs/taro'

export const publish = async () => {
  console.log('login...')

  try {
    await qrcodeLogin()
  } catch (ex) {
    console.error('ex = ', ex);
  }
}

export const draftColumn = async () => {
  const cookie = Taro.getStorageSync('set-cookie').map(item => item.split(';')[0]).join(';')

  const draftUrl = getUrl('https://zhuanlan.zhihu.com/api/articles/drafts', cookie)

  const res = await Taro.request({
    url: draftUrl,
    method: 'POST',
    dataType: 'json',
    data: { title: 'he', 'delta-time': 0 },
    header: {
      'authority': 'zhuanlan.zhihu.com',
      'origin': 'https://zhuanlan.zhihu.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://zhuanlan.zhihu.com/write',
      'x-requested-with': 'fetch'
    }
  })

  console.log('res = ', res);
}


export const getUrl = (url: string, cookie) => {
  return Taro.ENV_TYPE.WEB !== Taro.getEnv() ? url : `https://uniheart.pa-ca.me/proxy?cookie=${cookie}&url=${url}`
}

export const qrcodeLogin = async () => {
  const zhihuUdidUrl = 'https://www.zhihu.com/udid'
  const url = Taro.ENV_TYPE.WEB === Taro.getEnv() ? 'https://uniheart.pa-ca.me/proxy?dataType=text&url=' + encodeURIComponent(zhihuUdidUrl) : zhihuUdidUrl

  const res = await Taro.request({
    url,
    method: 'POST',
    dataType: 'text',
    header: {
      'content-type': `text/plain`,
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  Taro.setStorage({
    key: 'set-cookie',
    data: JSON.parse(res.data).headers['set-cookie']
  })

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
  Taro.setStorageSync('zhihu-token', res2.data.token);

  const scanInfoUrl = getUrl(`https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/scan_info`, '')

  Taro.previewImage({
    current: `https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/image`,
    urls: [`https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/image`],
  })

  const poll = async () => {
    try {
      const res3 = await Taro.request({
        url: scanInfoUrl,
        dataType: 'json',
      })

      if (res3.data.status === 0) {
        await poll();
      }

      if (res3.data.status === 1) {
        Taro.showToast({ title: '扫码成功', icon: 'success', duration: 2000 })
      }

      if (!!res3.data.user_id) {
        Taro.showToast({ title: '登录成功', icon: 'success', duration: 2000 })

        const originalCookie = Taro.getStorageSync('set-cookie')

        Taro.setStorage({
          key: 'set-cookie',
          data: originalCookie.concat(Object.keys(res3.data.cookie).map(key => `${key}=${res3.data.cookie[key]}`))
        })

        Taro.setStorageSync('zhihu-user-info', res3.data)

        Taro.showToast({ title: 'Cookie 设置成功', icon: 'success', duration: 2000 })
        console.log('now cookie = ', Taro.getStorageSync('set-cookie'));

        console.log('publishing...')
        await draftColumn()
      }

    } catch (err) {
      console.error('err = ', err);
    }
  }

  poll();
}