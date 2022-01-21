import {View} from "@tarojs/components"
import {useEffect} from "react";
import Taro from '@tarojs/taro'
import HardwayLayout from "../layout/hardway-layout";

const PearlsPlus = () => {
  useEffect(() => {
    const res = WXWebAssembly.instantiate('/pages/pearlsplus/proxy.wasm', {})
    
    console.log('res = ', res)
  }, [])


  return <HardwayLayout><View>
    以下是动态渲染的内容：
    {/*{res}*/}
  </View></HardwayLayout>
}

export default PearlsPlus
