import {ApolloClient, gql, InMemoryCache} from "@apollo/client"
import {Component} from 'react'
import {View, Text} from "@tarojs/components"

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
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

export default class YuQue extends Component {

  render() {
    return <View><Text>YuQue Blog</Text></View>
  }
}
