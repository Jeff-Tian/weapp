import {ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache, split} from "@apollo/client"
import Taro from "@tarojs/taro"
import crypto from 'crypto'

import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries"
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";

const gatewayGraphQLURl = 'https://sls.pa-ca.me/gateway'


const theFetch = async (url, options) => {
  const res = await Taro.request({
    url: url.toString(),
    method: (options?.method || 'POST') as 'POST' | 'GET',
    header: {
      'content-type': 'application/json',
      ...options.headers
    },
    data: options?.body,
    success: console.log
  })

  return {text: async () => JSON.stringify(res.data)} as any
}

const httpLink = createHttpLink({
  uri: gatewayGraphQLURl,
  fetch: theFetch
})

const queryLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
  sha256: async (document: string) => crypto.createHash('sha256').update(document).digest('hex')
})

const authLink = setContext((_, {headers}) => {
  const token = Taro.getStorageSync('_authing_token') || (localStorage ? localStorage.getItem('_authing_token') : undefined)

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  }
})

const testIfUploadOperation = ({query}) => {
  const {definitions} = query

  return definitions.some(({kind, operation, selectionSet: {selections}}) => {
    return kind === 'OperationDefinition' && operation === 'mutation' && selections.some(({name: {value}}) => value === 'uploadImage')
  })
}

const httpLinkForNormalOperations = ApolloLink.from([queryLink, httpLink]);

const onlineUploadableGraphQL = Taro.getEnv() === Taro.ENV_TYPE.WEB ? 'https://face-swap-jeff-tian.cloud.okteto.net/graphql' : gatewayGraphQLURl;

const uploadLink = createUploadLink({
  uri: process.env.FACE_SWAP_ENV !== 'local' ? onlineUploadableGraphQL : 'http://localhost:5001/graphql',
  fetch: theFetch
}) as any

export const client = new ApolloClient({
  link: concat(authLink, split(testIfUploadOperation, uploadLink, httpLinkForNormalOperations)),

  cache: new InMemoryCache()
})
