import axios from 'axios'

export const request = async config => {
  console.log('config = ', config)
  const res = await axios({url: `https://uniheart.pa-ca.me/proxy/no-cache?url=${encodeURIComponent(config.uri)}`})

  console.log('res = ', res)

  return {...res, body: res.data}
}

