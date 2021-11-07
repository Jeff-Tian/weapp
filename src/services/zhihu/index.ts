import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'

export const publish = async () => {
  console.log('publishing...')

  await qrcodeLogin()
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

  const intervalId = setInterval(async () => {
    const res3 = await Taro.request({
      url: scanInfoUrl,
      dataType: 'json',
    })
    console.log('res3 = ', res3);

    if (res3.data.status === 1) {
      clearInterval(intervalId)
    }

    Taro.showToast({ title: '扫码成功', icon: 'success', duration: 2000 })
  }, 1000)

  Taro.previewImage({
    current: `https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/image`,
    urls: [`https://www.zhihu.com/api/v3/account/api/login/qrcode/${res2.data.token}/image`],
    complete: (r) => {
      console.log('re = ', r);
    }
  })


}