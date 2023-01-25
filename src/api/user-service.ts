import {gql} from "@apollo/client";
import {client} from "@/apollo-client";
import Taro from "@tarojs/taro";
import {StorageKeys} from "@/common/constants";

export const GET_PREFERENCE_QUERY = gql`
  query GetPreference ($key: String!) {
    myPreference(key: $key) {
      key
      value
    }
  }
`;

export const getMyZhihuProfile = () => {
  return client.query({
    query:
    GET_PREFERENCE_QUERY, variables:
      {
        key: StorageKeys.zhihuUserCookie
      }
  })
}

const SAVE_PREFERENCE_MUTATION = gql`
mutation SaveMyZhihuCookies ($key: String!, $value: String!) {
  saveMyPreference (key: $key, value: $value) {
    key
    value
  }
}
`

export const saveMyZhihuCookies = (cookieData: string) => {
  return Promise.all([client.mutate({
    mutation: SAVE_PREFERENCE_MUTATION,
    variables: {
      key: StorageKeys.zhihuUserCookie,
      value: cookieData
    }
  }), client.mutate({
    mutation: SAVE_PREFERENCE_MUTATION,
    variables: {
      key: StorageKeys.zhihuUserInfo,
      value: JSON.stringify(Taro.getStorageSync(StorageKeys.zhihuUserInfo))
    }
  })])
}


const COPY_TO_CLIPBOARD = gql`
mutation CopyToClipboard($clipboard: ClipboardInput!) {
  copyToClipboard(clipboard: $clipboard) {
    key
    value
  }
}
`
export const copyCookieToClipboard = (userId: number, cookieData: string) => {
  saveMyZhihuCookies(cookieData).then(console.log).catch(console.error)

  client.mutate({
    mutation: COPY_TO_CLIPBOARD, variables:
      {
        clipboard: {
          key: `zhihu-user-cookie-${userId}`,
          value: JSON.stringify(cookieData)
        }
      }
  }).then(console.log).catch(console.error)
}
