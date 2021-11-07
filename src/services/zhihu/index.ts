import Taro from '@tarojs/taro'

export const loginAndPublish = async (title, content) => {
  return await draftColumn(title, content)
}

export const publish = async (title, content) => {
  console.log('login...')

  try {
    await qrcodeLogin(title, content)
  } catch (ex) {
    console.error('ex = ', ex);
  }
}

export const draftColumn = async (title, content) => {
  const cookie = Taro.getStorageSync('set-cookie').map(item => item.split(';')[0]).join(';')

  console.log("publish with cookie: ", cookie);

  const draftUrl = getUrl('https://zhuanlan.zhihu.com/api/articles/drafts', cookie)

  const res = await Taro.request({
    url: draftUrl,
    method: 'POST',
    dataType: 'json',
    data: { title, content, 'delta-time': 0 },
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
}


export const getUrl = (url: string, cookie) => {
  return Taro.ENV_TYPE.WEB !== Taro.getEnv() ? url : `https://uniheart.pa-ca.me/proxy?cookie=${cookie}&url=${url}`
}

export const qrcodeLogin = async (title, content) => {
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

  console.log('res = ', res.data, res);

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

        await poll();
      }

      if (!!res3.data.user_id) {
        Taro.showToast({ title: '登录成功', icon: 'success', duration: 2000 })

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

        Taro.showToast({ title: 'Cookie 设置成功', icon: 'success', duration: 2000 })
        console.log('now cookie = ', Taro.getStorageSync('set-cookie'));

        console.log('publishing...')
        await draftColumn(title, content)
      }

    } catch (err) {
      console.error('err = ', err);
    }
  }

  poll();
}