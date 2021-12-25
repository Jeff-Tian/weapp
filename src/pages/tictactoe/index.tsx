import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, { useEffect, useState } from "react";
import Taro, { ENV_TYPE } from "@tarojs/taro";

import './tictactoe.styl'
import divviewer from "../../adapters/divviewer";

// eslint-disable-next-line import/no-commonjs
const Babel = require('@babel/standalone/babel.min.js');

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
    const tictactoe = `class Square extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", { className: "square" }));



  }}


class Board extends React.Component {
  renderSquare(i) {
    return /*#__PURE__*/React.createElement(Square, null);
  }

  render() {
    const status = 'Next player: X';

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "status" }, status), /*#__PURE__*/
      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(3),
      this.renderSquare(4),
      this.renderSquare(5)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(6),
      this.renderSquare(7),
      this.renderSquare(8))));



  }}


class Game extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, null)), /*#__PURE__*/

      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null), /*#__PURE__*/
      React.createElement("ol", null))));



  }}


// ========================================

ReactDOM.render( /*#__PURE__*/
React.createElement(Game, null),
document.getElementById('root'));`

    Babel.registerPlugin('divviewer', divviewer);
    const output = Babel.transform(tictactoe, {presets: ['env'], plugins: []}).code.replace(/"div"/g, '"view"').replace(/"ol"/g, '"view"')
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
  }, [])

  return <View>
    以下是动态渲染的内容：
    <View id='react-dom-view'>
    </View>
    <View id='root'></View>
  </View>
}

export default TicTacToe
