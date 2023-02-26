import Taro, {ENV_TYPE} from "@tarojs/taro";
import {WeappLoginStatus} from "@/components/LoginStatus/weapp";
import {WebLoginStatus} from "@/components/LoginStatus/web";

export const LoginStatus = () => Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappLoginStatus /> : <WebLoginStatus />
