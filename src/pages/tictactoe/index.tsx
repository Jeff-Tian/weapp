import {Button, View} from "@tarojs/components"
import {Interpreter} from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, {useEffect, useState} from "react";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import {AtActivityIndicator} from "taro-ui";
import {gql, useQuery} from "@apollo/client";
import './tictactoe.styl'
import HardwayLayout from "../layout/hardway-layout";

// import divviewer from "../../adapters/divviewer";

const interpreter = new Interpreter(window, {
  timeout: 5000,
});

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
window['React'] = React;

const TicTacToe = () => {
  const [loading, setLoading] = useState(true)

  const transformRequest = gql`query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/Game.tsx", extra: "ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`
  const {loading: querying, error, data} = useQuery(transformRequest)

  if (data?.transform?.text) {
    interpreter.evaluate(data?.transform?.text)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return <HardwayLayout><View>
    以下是动态渲染的内容，原始内容来自 React 官方井字棋教程的初始状态（https://codepen.io/gaearon/pen/oWWQNa?editors=0010），即展示一个棋盘。
    <View id='react-dom-view'>
      <AtActivityIndicator mode='center' size={128} content='加载中……'
                           isOpened={loading}
      />
    </View>
    <View id='root'>
    </View>
    <View>
      虽然不能互动，但是它展示了 react-view 的能力，可以部分打破个人版小程序不能加载 webview 的限制。要有互动也是可能的，比如通过加载 React 官方井字棋教程的最终状态即可：
    </View>
    <Button onClick={() => Taro.navigateTo({url: '/pages/tictactoe/index2'})}>体验互动版 React 井字棋</Button>
  </View></HardwayLayout>
}

export default TicTacToe
