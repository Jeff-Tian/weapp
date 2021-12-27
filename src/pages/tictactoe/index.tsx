import {View} from "@tarojs/components"
import {Interpreter} from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, {useEffect, useState} from "react";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import './tictactoe.styl'
// import divviewer from "../../adapters/divviewer";

// eslint-disable-next-line import/no-commonjs
// const Babel = require('../../lib/package/dist/babel.min.js');

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

console.log('this = ', this, global, window);

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
window['React'] = React;

const TicTacToe = () => {
  const [dynamicContent, setDynamicContent] = useState('')

  useEffect(() => {
    Taro.request({
      url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://unpkg.com/@babel/standalone@7.16.6/babel.min.js')}`,
      responseType: 'text',
      dataType: 'text/plain'
    }).then(res => {
      const babel = res.data.replace(/const /g, 'var ').replace(/let /g, 'var ');
      global['Babel'] = interpreter.evaluate(`${babel}; window.Babel`)


      Taro.request({
        url: 'https://uniheart.pa-ca.me/proxy?url=https%3A%2F%2Fraw.githubusercontent.com%2FJeff-Tian%2FTicTacToeTs%2Fmain%2Fsrc%2FGame.tsx',
        responseType: 'text',
        dataType: 'text/plain'
      }).then(data => {
        const tictactoe = data.data;

        // Babel.registerPlugin('divviewer', divviewer);
        const output = tictactoe.replace(/import.+;/g, '').replace(/export/g, '');
        console.log('output = ', output);

        const dynamicContentRenderring = `
    console.log(this)
    ReactDOM.render(helloWorld(), document.getElementById('react-dom-view'))

    function helloWorld (){
      return React.createElement('button');
    }

    ${output}

    ReactDOM.render(<Game />, document.getElementById('root'))
  `;

        const transpiled = global['Babel'].transform(dynamicContentRenderring, {
          presets: ['env', 'react'],
          plugins: []
        })?.code?.replace(/"div"/g, '"view"').replace(/"ol"/g, '"view"')

        console.log('transpiled = ', transpiled);

        const finalRes = interpreter.evaluate(transpiled)

        setDynamicContent(finalRes)
      })
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
