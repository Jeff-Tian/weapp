import {ApolloProvider} from '@apollo/client'
import {Component} from 'react'

import {handleClipboard} from "@/functions/clipboard";

import 'taro-ui/dist/style/index.scss'
import Taro from "@tarojs/taro";

import './app.styl'
import {client} from "./apollo-client"


handleClipboard()

if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
  Taro.onPageNotFound(({isEntryPage, path}) => {
    console.log('path = ', isEntryPage, path);
  })

  Taro.onError((error) => {
    console.error('ah')
    console.error(error)
  })
}

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      {this.props.children}
    </ApolloProvider>
  }
}

export default App
