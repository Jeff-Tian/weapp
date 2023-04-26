import {authingAppId} from "@/common/constants";
import {AuthenticationClient} from "authing-wxapp-sdk";
import Taro from "@tarojs/taro";

export const authing = new AuthenticationClient({
  userPoolId: '620097b69a9dab5e967d0c44',
  appId: authingAppId
})

const Guard = window.GuardFactory ? window.GuardFactory.Guard : function () {
};

export const guard = Taro.getEnv() === Taro.ENV_TYPE.WEB ? new Guard({
  appId: authingAppId,
  mode: 'modal',
}) : null
