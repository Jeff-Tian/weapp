import {useGuard, User} from "@authing/guard-react";
import {useEffect, useState} from "react";
import {AtCard} from "taro-ui";

export const WebLoginStatus = () => {
  const guard = useGuard();
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
      {
        userInfo &&
        <AtCard note={userInfo.username || userInfo.nickname || userInfo.email || userInfo.phone || undefined}
          extra={userInfo.createdAt || undefined}
          title={userInfo.lastLogin || undefined}
          thumb={userInfo.photo || undefined}
        >登录过 {userInfo.loginsCount} 次。</AtCard>
      }
    </div>
  );
}
