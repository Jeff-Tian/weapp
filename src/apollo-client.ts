import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client"
import Taro from "@tarojs/taro"

export const client = new ApolloClient({

  link: new HttpLink({
    uri: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://jqp5j170i6.execute-api.us-east-1.amazonaws.com/dev/gatsby/graphql')}`,

    async fetch(url, options) {
      const res = await Taro.request({
        url: url.toString(),
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: options?.body,
        success: console.log
      })

      return {text: async () => JSON.stringify(res.data)} as any
    }
  }),
  cache: new InMemoryCache()
})
