import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";

export const redirect = url => () => {
  Taro.navigateTo({url})
  return <View>正在跳转如下页面： {url}</View>
}

export const getRedirect = path => path.replace('pages/', 'pages/subpages/')
