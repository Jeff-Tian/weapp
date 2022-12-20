import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split} from "@apollo/client"
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

const testIfUploadOperation = ({query}) => {
  console.log('query = ', query)
  const {definitions} = query
  console.log('def = ', definitions);

  return definitions.some(({kind, operation, selectionSet: {selections}}) => {
    return kind === 'OperationDefinition' && operation === 'mutation' && selections.some(({name: {value}}) => value === 'uploadImage')
  })
}

const httpLinkForNormalOperations = ApolloLink.from([queryLink, httpLink]);
const uploadLink = createUploadLink({uri: 'https://face-swap-jeff-tian.cloud.okteto.net/graphql'}) as any

export const client = new ApolloClient({
  link: split(testIfUploadOperation, uploadLink, httpLinkForNormalOperations),
  cache: new InMemoryCache()
})
