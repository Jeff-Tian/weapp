import {gql} from "@apollo/client";
import {client} from "@/apollo-client";

const SAVE_PREFERENCE_MUTATION = gql`
mutation SaveMyZhihuCookies ($key: String, $value: String) {
  saveMyPreference (key: $key, value: $value) {
    key
    value
  }
}
`

export const saveMyZhihuCookies = (cookieData: string) => {
  return client.mutate({
    mutation: SAVE_PREFERENCE_MUTATION,
    variables: {
      key: 'zhihu-user-cookie',
      value: cookieData
    }
  })
}
