import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, { useEffect, useState } from "react";
import Taro, { ENV_TYPE } from "@tarojs/taro";

import './tictactoe.styl'
import divviewer from "../../adapters/divviewer";

// eslint-disable-next-line import/no-commonjs
// const Babel = require('@babel/standalone/babel.min.js');

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

console.log('this = ', this, global, window);

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
window['React'] = React;

const TicTacToe = () => {
  const [dynamicContent, setDynamicContent] = useState('')

  useEffect(() => {
    Taro.request({ url: 'https://tictactoets.pa-ca.me/src/Game.tsx', responseType: 'text', dataType: 'text/plain' }).then(data => {
      const tictactoe = data.data;

      // Babel.registerPlugin('divviewer', divviewer);
      // const output = Babel.transform(tictactoe, { presets: ['env'], plugins: [] }).code.replace(/"div"/g, '"view"').replace(/"ol"/g, '"view"')

      const output = tictactoe;
      console.log('output = ', output);

      const dynamicContentRenderring = `
    console.log(this)
    ReactDOM.render(helloWorld(), document.getElementById('react-dom-view'))

    function helloWorld (){
      return React.createElement('button');
    }

    ${output}
  `;
      const res = interpreter.evaluate(dynamicContentRenderring)

      console.log('res = ', res, '; d = ', dynamicContent)

      setDynamicContent(res)
    })
  }, [])

  return <View>
    以下是动态渲染的内容：
    <View id='react-dom-view'>
    </View>
    <View id='root'></View>
  </View>
}

export default TicTacToe
