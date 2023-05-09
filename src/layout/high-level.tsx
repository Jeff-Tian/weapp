import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {AtDrawer, AtNavBar} from "taro-ui";
import {getCurrentPageUrl} from "@/common/helpers";
import {drawerItems, onDrawerItemClick} from "@/layout/drawer-items";
import {User} from "@authing/guard-react";
import {getUserInfo} from "@/common/login";
import {copyCurrentPagePath} from "@/functions/current-page";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const HighLevel = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo).catch(naiveErrorHandler);
  }, []);

  return (
    <View>
      <AtNavBar
        onClickRgIconSt={() => {
          setShowDrawer(true);
        }}
        onClickRgIconNd={() => {
          Taro.navigateTo({url: "/pages/subpages/auth/authing"});
        }}
        onClickLeftIcon={copyCurrentPagePath}
        color='#000'
        title='哈德韦'
        leftText='复制链接'
        leftIconType='link'
        rightFirstIconType='bullet-list'
        rightSecondIconType={
          userInfo ? {value: "user", color: "blue"} : "user"
        }
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
  );
};
