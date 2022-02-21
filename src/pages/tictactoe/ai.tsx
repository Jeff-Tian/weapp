import {View} from "@tarojs/components"
import {gql} from "@apollo/client";
import Taro from '@tarojs/taro';
import {useEffect, useState} from "react";
import cssToJS from "transform-css-to-js"

import './tictactoe.styl'
import HardwayLayout from "../../layout/hardway-layout";
import {DynamicContent} from "./dynamic-content";

// import divviewer from "../../adapters/divviewer";

const transformRequest = gql`query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/GameAI.tsx?a=bcdefg", extra: "; ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`


const TicTacToe = () => {
  const [css, setCss] = useState('')

  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(`https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/index.css`)}`}).then(({data})=>{
      setCss(data)
      const reactNativeCompatibleCSS = cssToJS(data)
      console.log('rcss = ', reactNativeCompatibleCSS)
    })
  }, [])

  return <HardwayLayout><View>
    以下是动态渲染的内容，原始内容在 https://tictactoe.js.org 。由于个人版小程序不能打开 webview，从而使用了 react-view 来局部渲染。这个小游戏仅仅在 React
    官方井字棋游戏最终状态的基础上，增加了人工智能而已。即玩家 O 是自动的，并且让玩家 X （你）先走。基于井字棋的特点，先走的人占优势，所以只要你不犯错，就不会输。但即使这样，你试试看能不能赢它？

    <DynamicContent gql={transformRequest}/>
  </View></HardwayLayout>;
}

export default TicTacToe
