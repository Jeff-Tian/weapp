import {User} from "@authing/guard-react";
import {AtCard} from "taro-ui";
import {View} from "@tarojs/components";

export const UserCard = ({userInfo}: { userInfo: User | undefined }) => {
  return userInfo ?
    <AtCard note={`注册于 ${userInfo.createdAt}，最近于 ${userInfo.lastLogin} 登录过`}
            extra={userInfo.phone || undefined}
            title={userInfo.username || userInfo.nickname || userInfo.email || undefined}
            thumb={userInfo.photo || undefined}
    >共登录过 {userInfo.loginsCount} 次。</AtCard> : <View>未获取到信息</View>
}
