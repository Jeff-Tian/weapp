import axios from 'axios'

export const request = async config => {
  console.log('config = ', config)

  const proxyUrl = config.method === 'get' ? 'https://uniheart.pa-ca.me/proxy/no-cache?url=' : 'https://uniheart.pa-ca.me/proxy?url='

  const res = await axios({
    method: config.method, headers: {
      'authority': 'www.zhihu.com'
    }, url: `${proxyUrl}${encodeURIComponent(config.uri)}`
  })

  console.log('res = ', res)

  return { ...res, body: res.data }
}

