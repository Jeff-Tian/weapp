import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";


const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({})

  useEffect(() => {
      Taro.getSystemInfo({success: setSystemInfo}).then();
    }
    , [])

  return <View><View>系统信息：</View><View>${JSON.stringify(systemInfo)}</View></View>;
}

export default SystemInfo
