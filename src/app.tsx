import {ApolloProvider} from '@apollo/client'
import {Component} from 'react'

import {handleClipboard} from "@/functions/clipboard";

import 'taro-ui/dist/style/index.scss'

import './app.styl'
import {client} from "./apollo-client"

handleClipboard()

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      {this.props.children}
    </ApolloProvider>
  }
}

export default App
