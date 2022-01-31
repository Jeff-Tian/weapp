import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import { useEffect, useState } from "react";
import HardwayLayout from "../layout/hardway-layout";
import './wasm.styl'

const PearlsPlus = () => {
  const [output, setOutput] = useState('')

  useEffect(() => {
    WXWebAssembly.instantiate('pages/wasm/hello.wasm', { env: { __cxa_atexit: () => { }, strftime_l: () => { }, abort: () => { }, emscripten_resize_heap: () => { }, emscripten_memcpy_big: () => { }, setTempRet0: () => { } }, wasi_snapshot_preview1: { environ_sizes_get: () => { }, environ_get: () => { }, fd_write: () => { }, fd_read: () => { }, fd_close: () => { }, fd_seek: () => { } } }).then(console.log, console.error)


    // const worker = Taro.createWorker('pages/wasm/index.js')
    // worker.onMessage(({ message }) => {
    //   if (typeof message === 'string') {
    //     Taro.showToast({
    //       title: String(message)
    //     })
    //   } else {
    //     console.log('worker said: ', message)
    //     setOutput(message.output)
    //   }
    // })
  }, [])


  return <HardwayLayout><View>
    以下是 C++ 版的 Hello World 程序显示的内容，在线版见： https://pearlsplus.pa-ca.me/。源代码文件详见：  https://github.com/Jeff-Tian/PearlsPlus/blob/main/main.cpp 。
    <View id='status'></View>
    <View id='progress'></View>
    <View id='spinner'></View>
    <View className='terminal' id='output'>{output}</View>
  </View></HardwayLayout>
}

export default PearlsPlus
