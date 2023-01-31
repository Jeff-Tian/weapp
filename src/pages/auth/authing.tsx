import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";

const Authing = () => {
  const url = '/pages/subpages/auth/authing'

  Taro.navigateTo({url}).then()

  return <View>正在跳转到如下页面： {url}</View>
}

export default Authing
