import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client"
import Taro from "@tarojs/taro"
import crypto from 'crypto'

import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries"
import {createUploadLink} from "apollo-upload-client";

const graphQLServerUrl = 'https://sls.pa-ca.me/nest/graphql'

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
  link: ApolloLink.from([queryLink, httpLink]),
  cache: new InMemoryCache()
})

export const uploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink() as any
})
