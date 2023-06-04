import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";
import {JsonViewerWrapper} from "@/components/JsonViewer";


const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({})

  useEffect(() => {
      Taro.getSystemInfo({success: setSystemInfo}).then();
    }
    , [])

  return <View><View>系统信息：</View>
    <JsonViewerWrapper json={systemInfo} initialViewMode='raw' />
  </View>;
}

export default SystemInfo
