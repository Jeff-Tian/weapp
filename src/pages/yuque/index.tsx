import {ApolloClient, gql, HttpLink, InMemoryCache} from "@apollo/client"
import {Component} from 'react'
import {View, Text} from "@tarojs/components"
import Taro from '@tarojs/taro'

export default class YuQue extends Component {

  constructor(props) {
    super(props)

    const client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://48p1r2roz4.sse.codesandbox.io', fetch: async (url) => {
          const res = await Taro.request({
            url: url.toString(),
            success: console.log
          })

          console.log('res = ', res);

          return {text: async () => JSON.stringify({hello: 'world'})} as any
        }
      }),
      cache: new InMemoryCache()
    })

    client.query({
      query: gql`
    query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
  `
    }).then(console.log)
  }

  render() {
    return <View><Text>YuQue Blog</Text></View>
  }
}
