import Taro from "@tarojs/taro";
import { authing, guard } from "@/common/authing";

export const getToken = async () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    const user = await authing.getCurrentUser();
    return user?.token;
  } else {
    const loginStatus = await guard.checkLoginStatus();

    if (loginStatus.data.id) {
      const user = await guard.trackSession();

      return user.token;
    } else {
      return null;
    }
  }
};
