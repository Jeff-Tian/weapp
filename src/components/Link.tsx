import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";

const Link = ({src}) => {
  return Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? <View>src</View> : <a href={src} target='_blank'>{src}</a>
}

export default Link
