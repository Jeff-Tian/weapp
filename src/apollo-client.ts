import {ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache} from "@apollo/client"
import Taro from "@tarojs/taro"
import crypto from 'crypto'

import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries"
import {createUploadLink} from "apollo-upload-client";

const graphQLServerUrl = 'https://sls.pa-ca.me/gateway'

const httpLink = createHttpLink({
  uri: graphQLServerUrl,
  async fetch(url, options) {
    console.log('url = ', url, options)
    const res = await Taro.request({
      url: url.toString(),
      method: (options?.method || 'POST') as 'POST' | 'GET',
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
  sha256: async (document: string) => crypto.createHash('sha256').update(document).digest('hex')
})

export const client = new ApolloClient({
  link: ApolloLink.from([queryLink, concat(createUploadLink({uri: 'https://face-swap-jeff-tian.cloud.okteto.net/graphql'}) as any, httpLink)]),
  cache: new InMemoryCache()
})
