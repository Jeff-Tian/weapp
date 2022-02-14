import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";

const Ip = () => {
  const [ip, setIp] = useState('')

  useEffect(() => {
    Taro.request({url: 'https://ixqjctn825.execute-api.us-east-1.amazonaws.com/default/blank-java-function-rHHNyqQn8LwZ/'}).then(console.log).catch(console.error)
  }, [])

  return <View>你的 IP 地址是：</View>
}

export default Ip
