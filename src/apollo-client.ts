import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client"
import Taro from "@tarojs/taro"
import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries"
import ENV_TYPE = Taro.ENV_TYPE
import {sha256} from 'crypto-hash'

const awsLambdaApiGateway = 'https://jqp5j170i6.execute-api.us-east-1.amazonaws.com/dev/gatsby/graphql'

const graphQLServerUrl = Taro.getEnv() === ENV_TYPE.WEB ? awsLambdaApiGateway : `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(awsLambdaApiGateway)}`

const httpLink = createHttpLink({
  uri: graphQLServerUrl,
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
})

const queryLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
  sha256
})

export const client = new ApolloClient({
  link: ApolloLink.from([queryLink, httpLink]),
  cache: new InMemoryCache()
})
