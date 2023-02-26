import {AuthenticationClient} from "authing-wxapp-sdk";
import {authingAppId} from "@/common/constants";
import {User} from "@authing/guard-react";
import Taro from "@tarojs/taro";

const authing = new AuthenticationClient({
  userPoolId: '620097b69a9dab5e967d0c44',
  appId: authingAppId
})

export const login = async (): Promise<User> => {
  const {code} = await Taro.login()
  // 成功登录，将 token 写入微信 Storage
  return await authing.loginByCode(code)
}

const Guard = window.GuardFactory ? window.GuardFactory.Guard : function () {
};
export const guard = Taro.getEnv() === Taro.ENV_TYPE.WEB ? new Guard({
  appId: authingAppId,
  mode: 'modal',
}) : null

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
