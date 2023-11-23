import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {AtNavBar} from "taro-ui";
import {User} from "@authing/guard-react";
import {getUserInfo} from "@/common/login";
import {copyCurrentPagePath} from "@/functions/current-page";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const SimpleFrame = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo).catch(naiveErrorHandler);
  }, []);

  return (
    <View>
      <AtNavBar
        onClickRgIconSt={() => {
          console.log('hello!')
        }}
        onClickRgIconNd={() => {
          Taro.navigateTo({url: "/pages/subpages/auth/authing"});
        }}
        onClickLeftIcon={copyCurrentPagePath}
        color='#000'
        title='Brickverse'
        leftText='复制链接'
        leftIconType='link'
        rightFirstIconType='bullet-list'
        rightSecondIconType={
          userInfo ? {value: "user", color: "blue"} : "user"
        }
      />
    </View>
  );
};
