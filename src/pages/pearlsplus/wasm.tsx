import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import { useEffect, useState } from "react";
import HardwayLayout from "../layout/hardway-layout";
import './wasm.styl'

const PearlsPlus = () => {
  const [output, setOutput] = useState('')

  useEffect(() => {
    const worker = Taro.createWorker('pages/wasm/index.js')
    worker.onMessage(({ message }) => {
      if (typeof message === 'string') {
        Taro.showToast({
          title: String(message)
        })
      } else {
        console.log('worker said: ', message)
        setOutput(message.output)
      }
    })
  }, [])


  return <HardwayLayout><View>
    以下是动态渲染的内容：
    <View id='status'></View>
    <View id='progress'></View>
    <View id='spinner'></View>
    <View className='terminal' id='output'>{output}</View>
  </View></HardwayLayout>
}

export default PearlsPlus
