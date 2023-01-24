import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {AtDrawer, AtNavBar} from "taro-ui";
import {getCurrentPageUrl} from "@/common/helpers";
import {drawerItems, onDrawerItemClick} from "@/layout/drawer-items";
import {User} from "@authing/guard-react";
import {getUserInfo} from "@/common/login";

export const HighLevel = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo)
  }, [])

  return <View>
    <AtNavBar
      onClickRgIconSt={(...args) => {
        console.log('rg iconst = ', args);
        setShowDrawer(true)
      }}
      onClickRgIconNd={() => {
        Taro.navigateTo({url: '/pages/subpages/auth/authing'})
      }}
      onClickLeftIcon={(...args) => {
        console.log('left icon = ', args);
        const path = getCurrentPageUrl(Taro.getCurrentInstance().router)

        Taro.setClipboardData({data: `${path}`}).then(() =>
          Taro.showToast({
            title: `${path} 已复制`,
            icon: 'success',
          })
        ).catch(err => Taro.showToast({
          title: `${path} 复制失败：${err}`,
          icon: 'error'
        }))
      }}
      color='#000'
      title='哈德韦'
      leftText='复制链接'
      leftIconType='link'
      rightFirstIconType='bullet-list'
      rightSecondIconType={userInfo ? {value: 'user', color: 'blue'} : 'user'}
    />

    <AtDrawer
      show={showDrawer}
      mask
      right
      onClose={() => setShowDrawer(false)}
      items={[...drawerItems.keys()]}
      onItemClick={onDrawerItemClick}
    />

  </View>
}
