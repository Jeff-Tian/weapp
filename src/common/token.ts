import Taro from "@tarojs/taro";
import {authing, guard} from "@/common/authing";

export const getToken = async () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    const {token} = await authing.getCurrentUser();
    return token;
  } else {
    return guard.getToken();
  }
}
