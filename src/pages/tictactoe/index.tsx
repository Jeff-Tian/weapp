import {View} from "@tarojs/components"
import {Interpreter} from "eval5";
import Taro from '@tarojs/taro'
import React from 'react';
import ReactDOM from '@tarojs/react'
import ENV_TYPE = Taro.ENV_TYPE;

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

const TicTacToe = () => {
  global.React = React;
  window['ReactDOM'] = ReactDOM;
  console.log('This = ', this, global, window)
  const res = ENV_TYPE.WEB === Taro.getEnv() ? interpreter.evaluate(`
    console.log('this = ', this, '${global.React}')
    var React = this.React;
    console.log(React.createElement);
    React.createElement('div', null, 'Hello');
  `) : interpreter.evaluate(`
    var ReactDOM = this.ReactDOM;
    ReactDOM.render('Hello');
  `)

  return <View>
    以下是动态渲染的内容：
    {res}
  </View>
}

export default TicTacToe
