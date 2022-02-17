import Taro from '@tarojs/taro'
import {View} from "@tarojs/components"
import {AtTextarea} from "taro-ui";
import {useEffect, useState} from "react";
import {Interpreter} from "eval5";
import HardwayLayout from "../../layout/hardway-layout";
import './wasm.styl'

const PearlsPlus = () => {
  const [code, setCode] = useState('加载中……')
  const [status, setStatus] = useState('正在加载运行时……')
  const [printed, setPrinted] = useState('')
  let userInput = []
  const output: string[] = []

  let count = 0;
  const interpreter = new Interpreter({
    ...window,
    Module: {
      print: function (text) {
        console.log('eval = ', text);
        output.push(text)

        setPrinted(output.join('\n'))
      }
    },
    window: {
      prompt: () => {
        console.log('count = ', count, userInput[count])
        return userInput[count++] || null
      }
    }
  }, {
    timeout: 5000, rootContext: {}
  });


  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://raw.githubusercontent.com/Jeff-Tian/PearlsPlus/main/chapter1/1.6.2.c')}`}).then(({data}) => {
      setCode(data)
    }).catch(err => setCode(JSON.stringify(err)))
  }, [])

  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?a=b&url=${encodeURIComponent('https://pearlsplus.pa-ca.me/chapter1/c1.6.2.js')}`}).then(({
                                                                                                                                                   data,
                                                                                                                                                   statusCode
                                                                                                                                                 }) => {
      if (statusCode === 404) {
        const title = '运行时缺失，请确认远程运行时文件存在。';
        Taro.showToast({title}).then()
        setStatus(title)
      } else {
        setStatus('运行时下载完成。')
        setStatus('运行时加载完毕。')

        setTimeout(() => {
          interpreter.evaluate(data)
        }, 10)
      }
    }).catch(err => setStatus(JSON.stringify(err)))
  }, [])

  return <HardwayLayout><View>
    <View>1.6 习题</View>
    <View>2. 如何使用位逻辑运算（例如与、或、移位）来实现位向量？</View>
    <View>C 源代码：</View>
    <AtTextarea className='code' onChange={() => {
    }} value={code} maxLength={Infinity} count={false} disabled
    />

    <View>执行结果：</View>
    <AtTextarea className='terminal' disabled placeholder={status} onChange={() => {
    }} value={printed} count={false} maxLength={Infinity}
    />
  </View></HardwayLayout>
}

export default PearlsPlus
