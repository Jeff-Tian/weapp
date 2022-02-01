import Taro from '@tarojs/taro'
import {View} from "@tarojs/components"
import {AtModal, AtTextarea} from "taro-ui";
import {useEffect, useState} from "react";
import {Interpreter} from "eval5";
import HardwayLayout from "../layout/hardway-layout";
import './wasm.styl'

const PearlsPlus = () => {
  const [code, setCode] = useState('加载中……')
  const [output, setOutput] = useState('正在加载运行时……')

  let count = 0;
  const interpreter = new Interpreter({
    ...window,
    Module: {
      print: function (text) {
        console.log('eval = ', text);
        setOutput(text)
      }
    },
    window: {
      prompt: () => {
        count++
        console.log('hello')

        if (count > 100) {
          return null
        } else if (count > 200) {
          return false
        } else {
          return 0;
        }
      }
    }
  }, {
    timeout: 5000, rootContext: {}
  });


  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://raw.githubusercontent.com/Jeff-Tian/PearlsPlus/main/chapter1/1.6.1.cpp')}`}).then(({data}) => {
      setCode(data)
    }).catch(err => setCode(JSON.stringify(err)))
  }, [])

  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://pearlsplus.pa-ca.me/chapter1/wmp-1.6.1.js')}`}).then(({data}) => {
      setOutput('正在执行……')
      interpreter.evaluate(data)
    }).catch(err => setOutput(JSON.stringify(err)))
  }, [])


  return <HardwayLayout><View>
    以下是 C++ 版的 Hello World 程序显示的内容，在线版见： https://pearlsplus.pa-ca.me/。源代码文件详见：
    https://github.com/Jeff-Tian/PearlsPlus/blob/main/main.cpp 。

    <View>源代码：</View>
    <AtTextarea className='code' onChange={() => {
    }} value={code} maxLength={1000000000} count={false} disabled
    />

    <AtModal
      isOpened={false}
      title='输入一个数字，不输入按取消即可。'
      cancelText='取消'
      confirmText='确认'
      onClose={() => {
      }}
      onCancel={() => {
      }}
      onConfirm={() => {
      }}
    >Hello</AtModal>
    <View>执行结果：</View>
    <View className='terminal' id='output'>{output}</View>
  </View></HardwayLayout>
}

export default PearlsPlus
