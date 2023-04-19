import Taro from "@tarojs/taro";
import {authing, guard} from "@/common/authing";

export const getToken = async () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    const user = await authing.getCurrentUser();
    return user?.token;
  } else {
    const user = await guard.checkLoginStatus();

    return user?.token;
  }
}
