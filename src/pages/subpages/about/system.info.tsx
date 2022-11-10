import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";
import {AtTextarea} from "taro-ui";


const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({})

  useEffect(() => {
      Taro.getSystemInfo({success: setSystemInfo}).then();
    }
    , [])

  return <View><View>系统信息：</View><AtTextarea maxLength={9999} height={800} disabled value={JSON.stringify(systemInfo, undefined, 4)} onChange={() => {
  }}
  /></View>;
}

export default SystemInfo
