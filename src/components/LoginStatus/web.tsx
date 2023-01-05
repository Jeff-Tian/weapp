import {useGuard, User} from "@authing/guard-react";
import {useEffect} from "react";

export const WebLoginStatus = () => {
  const guard = useGuard();

  useEffect(() => {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    guard.start("#authing-guard-container").then((userInfo: User) => {
      console.log("userInfo: ", userInfo);
    });
  }, []);

  return (
    <div>
      <div id='authing-guard-container'></div>
    </div>
  );
}
