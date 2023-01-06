import {User} from "@authing/guard-react";
import {useEffect, useState} from "react";
import {UserCard} from "@/components/UserCard";
import {authingAppId} from "@/common/constants";

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
    </div>
  );
}
