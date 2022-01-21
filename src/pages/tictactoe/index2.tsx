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
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/Game2.tsx", extra: "ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`
  const {data} = useQuery(transformRequest)

  if (data?.transform?.text) {
    interpreter.evaluate(data?.transform?.text)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return <HardwayLayout><View>
    以下有动态渲染的内容，请稍作等待…… 这是 React 官方井字棋教程的最终状态，玩家 X 和玩家 O 对战。
    <View id='react-dom-view'>
      <AtActivityIndicator mode='center' size={128} content='加载中……'
        isOpened={loading}
      />
    </View>
    <View id='root'>
    </View>
    <View>
      我们可以在这个基础上，让玩家 O 自动下棋，可以点击按钮体验：
    </View>
    <Button onClick={() => Taro.navigateTo({url: '/pages/tictactoe/ai'})}>体验人工智能版井字棋</Button>
  </View></HardwayLayout>
}

export default TicTacToe
