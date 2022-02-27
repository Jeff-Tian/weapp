import { View } from '@tarojs/components';
import Taro from '@tarojs/taro'

const Pearls = () => {
  return Taro.redirectTo({
    url: '/pages/subpages/pearlsplus/c-detail?id=1.6.2&input=0'
  }).then();

  return <View>跳转中……</View>
}

export default Pearls
