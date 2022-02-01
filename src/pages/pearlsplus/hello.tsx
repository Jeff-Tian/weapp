import Taro from '@tarojs/taro'
import {View} from "@tarojs/components"
import {useEffect, useState} from "react";
import {Interpreter} from "eval5";
import HardwayLayout from "../layout/hardway-layout";
import './wasm.styl'


const PearlsPlus = () => {
  const [output, setOutput] = useState('')

  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://pearlsplus.pa-ca.me/wmp-index.js')}`}).then(({data}) => {

      const interpreter = new Interpreter({
        ...window,
        Module: {
          print: function (text) {
            console.log('eval = ', text);
            setOutput(text)
          }
        }
      }, {
        timeout: 5000, rootContext: {}
      });

      interpreter.evaluate(data)
    }).catch(console.error)
  }, [])


  return <HardwayLayout><View>
    以下是 C++ 版的 Hello World 程序显示的内容，在线版见： https://pearlsplus.pa-ca.me/。源代码文件详见：
    https://github.com/Jeff-Tian/PearlsPlus/blob/main/main.cpp 。

    <View className='terminal' id='output'>{output}</View>
  </View></HardwayLayout>
}

export default PearlsPlus
