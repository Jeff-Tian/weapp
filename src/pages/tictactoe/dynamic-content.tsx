import {useQuery} from "@apollo/client";
import {AtActivityIndicator} from "taro-ui";
import {View} from "@tarojs/components";
import util from "util";
import {Interpreter} from "eval5";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import React from "react";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'

const interpreter = new Interpreter(window, {
  timeout: 5000,
});

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
window['React'] = React;

export const DynamicContent = ({gql, variables}: {gql, variables?: object}) => {

  const {loading, error, data} = useQuery(gql, {variables})

  if (loading) {
    return <AtActivityIndicator mode='center' size={128} content='加载中……'
      isOpened={loading}
    />
  }

  if (error) {
    console.error(error)
    return <View>发生了错误： {util.inspect(error)}</View>
  }

  if (data?.transform?.text) {
    setTimeout(() => {
        interpreter.evaluate(data?.transform?.text)
      }
    )
  }

  return <View id='root' />
}
