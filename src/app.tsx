import {ApolloProvider} from '@apollo/client'
import {Component} from 'react'
import Taro from "@tarojs/taro"

import 'taro-ui/dist/style/index.scss'

import './app.styl'
import {client} from "./apollo-client"


function handleYuQueUrl(url: string) {
  console.log('url = ', url);
  if (url.indexOf(`yuque.com`) >= 0) {
    const slug = url.split(`/`).slice(-1)[0]
    console.log('slug = ', slug)
    if (slug) {
      Taro.navigateTo({url: `/pages/yuque/article?slug=${slug.replace(/"/g, '')}`})
    }
  } else {
    console.log('rul = ', url);
  }
}

Taro.getClipboardData({
  success: res => {
    handleYuQueUrl(res.data)
  }
})

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      {this.props.children}
    </ApolloProvider>
  }
}

export default App
