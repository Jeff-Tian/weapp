import {View} from "@tarojs/components"
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
  const [tictactoe, setTictactoe] = useState('')

  const transformRequest = gql`query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/GameAI.tsx", extra: "; ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`
  const {data} = useQuery(transformRequest)

  if (data?.transform?.text) {
    setTictactoe(String(data?.transform?.text))
    interpreter.evaluate(tictactoe)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return <HardwayLayout><View>
    以下是动态渲染的内容，原始内容在 https://tictactoe.js.org 。由于个人版小程序不能打开 webview，从而使用了 react-view 来局部渲染。这个小游戏仅仅在 React
    官方井字棋游戏最终状态的基础上，增加了人工智能而已。即玩家 O 是自动的，并且让玩家 X （你）先走。基于井字棋的特点，先走的人占优势，所以只要你不犯错，就不会输。但即使这样，你试试看能不能赢它？

    <View id='react-dom-view'>
      <AtActivityIndicator mode='center' size={128} content='加载中……'
        isOpened={loading}
      />
    </View>
    <View id='root'>
    </View>
  </View></HardwayLayout>
}

export default TicTacToe
