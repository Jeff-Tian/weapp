import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import Taro, { onWindowResize } from '@tarojs/taro'
import React, { useEffect } from 'react';
import ReactDOM from '@tarojs/react'
import ENV_TYPE = Taro.ENV_TYPE;

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

const TicTacToe = () => {
  global.React = React;
  window['ReactDOM'] = ReactDOM;
  console.log('This = ', this, global, window)
  console.log(ReactDOM.render);
  console.log('view = ', window.document.querySelector('div'))

  let res
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    const test = query.select('#test');
    console.log('test = ', test)



    res = ENV_TYPE.WEB === Taro.getEnv() ? interpreter.evaluate(`
    console.log('this = ', this, '${global.React}')
    var React = this.React;
    console.log(React.createElement);
    React.createElement('div', null, 'Hello');
  `) : interpreter.evaluate(`
    var ReactDOM = this.ReactDOM;
    console.log('findDomNode = ', ReactDOM.findDOMNode, document.getElementById('test'))
    ReactDOM.render('hello', document.getElementById('test'))
  `)
  }, [])

  return <View id="test">
    以下是动态渲染的内容：
    {res}
  </View>
}

export default TicTacToe
