import {User} from "@authing/guard-react";
import Taro from "@tarojs/taro";
import {authing, guard} from "@/common/authing";


export const login = async (): Promise<User> => {
  const {code} = await Taro.login()
  // 成功登录，将 token 写入微信 Storage
  return await authing.loginByCode(code);
}


export const getUserInfo = async (): Promise<User> => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    await login();
    return await authing.getCurrentUser();
  } else {
    return await guard.trackSession();
  }
}

export const logout = async () => {
  if (Taro.getEnv() !== Taro.ENV_TYPE.WEAPP) {
    await guard.logout();
  } else {
    await authing.logout();
  }
}
