import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, { useEffect, useState } from "react";
import Taro, { ENV_TYPE } from "@tarojs/taro";
import './tictactoe.styl'

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

console.log('this = ', this, global, window);

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
// window['React'] = ENV_TYPE.WEB === Taro.getEnv() ? Nerv : React;
window['React'] = React;

const TicTacToe = () => {
  const [dynamicContent, setDynamicContent] = useState('')

  useEffect(() => {
    const dynamicContentRenderring = `
    console.log(this)
    ReactDOM.render(helloWorld(), document.getElementById('react-dom-view'))

    function helloWorld (){
      return React.createElement('button');
    }
  `;
    const res = interpreter.evaluate(dynamicContentRenderring)

    console.log('res = ', res, '; d = ', dynamicContent)

    setDynamicContent(res)
  }, [])

  return <View>
    以下是动态渲染的内容：
    <View id='react-dom-view'>
    </View>
    <View id='root'></View>
  </View>
}

export default TicTacToe
