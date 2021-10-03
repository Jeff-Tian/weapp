import {ApolloProvider} from '@apollo/client'
import {Component} from 'react'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.styl'
import {client} from "./apollo-client"

class App extends Component {

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return <ApolloProvider client={client}>
      {this.props.children}
    </ApolloProvider>
  }
}

export default App
