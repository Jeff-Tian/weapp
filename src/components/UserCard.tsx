import {User} from "@authing/guard-react";
import {AtCard} from "taro-ui";
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";

export const UserCard = ({userInfo}: { userInfo: User | undefined }) => {
  const navigateToProfile = () => {
    const currentPath = Taro.getCurrentInstance().router?.path;

    if (currentPath?.startsWith('/pages/subpages/auth/profile') && Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.open('https://www.brickverse.net/profile')
      return;
    }

    if (userInfo?.id === '6204de0a49c31874b97d470b') {
      return Taro.navigateTo({url: '/pages/subpages/auth/profile'});
    } else {
      Taro.showToast({
        title: '仅网页版可用',
      })
    }
  };

  return userInfo ?
    <AtCard note={`注册于 ${userInfo.createdAt}，最近于 ${userInfo.lastLogin} 登录过`}
      extra={userInfo.phone || undefined}
      title={userInfo.username || userInfo.nickname || userInfo.email || undefined}
      thumb={userInfo.photo || undefined}
      onClick={navigateToProfile}
    >共登录过 {userInfo.loginsCount} 次。</AtCard> : <View>未获取到信息</View>
}
