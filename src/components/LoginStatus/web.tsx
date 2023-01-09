import {User} from "@authing/guard-react";
import {useEffect, useState} from "react";
import {UserCard} from "@/components/UserCard";
import {authingAppId} from "@/common/constants";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";

export const WebLoginStatus = () => {
  const guard = new window.GuardFactory.Guard({
    appId: authingAppId,
    mode: 'modal',
  })
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    guard.start("#authing-guard-container").then((user: User) => {
      console.log("user: ", user);
      setUserInfo(user);
      guard.hide();
    });
  }, []);

  return (
    <div>
      <div id='authing-guard-container'></div>
      <UserCard userInfo={userInfo} />

      <AtButton onClick={() => {
        guard.logout();
        Taro.reLaunch({url: '/pages/yuque/index'})
      }}
      >退出登录</AtButton>
    </div>
  );
}
