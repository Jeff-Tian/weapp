import Taro from '@tarojs/taro'
import {View} from "@tarojs/components"
import {useEffect} from "react";
import HardwayLayout from "../layout/hardway-layout";

const PearlsPlus = () => {
  useEffect(() => {
    const worker = Taro.createWorker('pages/wasm/index.js')
    worker.postMessage({msg: 'msg from main'});
  }, [])


  return <HardwayLayout><View>
    以下是动态渲染的内容：
    {/*{res}*/}
  </View></HardwayLayout>
}

export default PearlsPlus
