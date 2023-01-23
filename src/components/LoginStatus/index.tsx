import Taro, {ENV_TYPE} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {WeappLoginStatus} from "@/components/LoginStatus/weapp";
import {WebLoginStatus} from "@/components/LoginStatus/web";

export const LoginStatus = () => {
  return <View onClick={() => Taro.navigateTo({url: '/pages/subpages/auth/profile'})}>
    {
      Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappLoginStatus /> : <WebLoginStatus />
    }
  </View>
}
