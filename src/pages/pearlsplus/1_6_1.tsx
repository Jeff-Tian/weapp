import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";

const PearlsPlus = () => {
  Taro.redirectTo({
    url: '/pages/subpages/pearlsplus/detail?id=1.6.1'
  }).then()

  return <View>跳转中……</View>
}

export default PearlsPlus
