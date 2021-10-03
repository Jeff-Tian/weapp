import {ApolloClient, gql, HttpLink, InMemoryCache} from "@apollo/client"
import {Component} from 'react'
import {View, Text} from "@tarojs/components"
import Taro from '@tarojs/taro'

export default class YuQue extends Component {

  constructor(props) {
    super(props)

    const client = new ApolloClient({

      link: new HttpLink({
        uri: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://jqp5j170i6.execute-api.us-east-1.amazonaws.com/dev/gatsby/graphql')}`,

        async fetch(url, options) {
          const res = await Taro.request({
            url: url.toString(),
            method: 'POST',
            data: options?.body,
            success: console.log
          })

          console.log('res = ', res)

          return {text: async () => JSON.stringify(res.data)} as any
        }
      }),
      cache: new InMemoryCache()
    })

    client.query({
      query: gql`
        query ($id: String!) {
          yuque(id: $id) {
            id
            title
          }
        }
  `,
      variables: {id: `53296538`},
    }).then(console.log)
  }

  render() {
    return <View><Text>YuQue Blog</Text></View>
  }
}
