import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react";
import Taro, { ENV_TYPE } from "@tarojs/taro";

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

const TicTacToe = () => {
  window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;

  const [dynamicContent, setDynamicContent] = useState('')

  useEffect(() => {
    const dynamicContentRenderring = `
    var ReactDOM = this.ReactDOM;
    console.log('findDomNode = ', ReactDOM.findDOMNode, document.getElementById('react-dom-view'))
    ReactDOM.render('hello', document.getElementById('react-dom-view'))
  `;
    const res = interpreter.evaluate(dynamicContentRenderring)

    console.log('res = ', res, '; d = ', dynamicContent)

    setDynamicContent(res)
  }, [dynamicContent])

  return <View>
    以下是动态渲染的内容：
    <View id='react-dom-view'>
    </View>
  </View>
}

export default TicTacToe
