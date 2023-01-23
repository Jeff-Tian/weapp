import {gql} from "@apollo/client";
import {client} from "@/apollo-client";
import Taro from "@tarojs/taro";
import {StorageKeys} from "@/common/constants";

const SAVE_PREFERENCE_MUTATION = gql`
mutation SaveMyZhihuCookies ($key: String, $value: String) {
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
      key: 'zhihu-user-cookie',
      value: cookieData
    }
  }), client.mutate({
    mutation: SAVE_PREFERENCE_MUTATION,
    variables: {
      key: StorageKeys.zhihuUserInfo,
      value: Taro.getStorageSync(StorageKeys.zhihuUserInfo)
    }
  })])
}
