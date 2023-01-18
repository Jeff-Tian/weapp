import {useEffect, useState} from "react";
import {memoizedAsync} from "@/common/helpers";
import {View} from "@tarojs/components";
import {AtActivityIndicator, AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import {AuthenticationClient} from "authing-wxapp-sdk";
import {authingAppId} from "@/common/constants";
import {UserCard} from "@/components/UserCard";
import {User} from "@authing/guard-react";


const authing = new AuthenticationClient({
  userPoolId: '620097b69a9dab5e967d0c44',
  appId: authingAppId
})

export const login = async (): Promise<User> => {
  const {code} = await Taro.login()
  // 成功登录，将 token 写入微信 Storage
  return await authing.loginByCode(code)
}


export const WeappLoginStatus = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    memoizedAsync(login)().then(res => {
      console.log(res)
      setLoading(false)
      setUser(res)
    })
  }, [])

  return <View>
    <AtActivityIndicator mode='center' size={128} content='加载中……'
      isOpened={loading}
    />
    {!loading ? <UserCard userInfo={user || undefined} /> : null}


    <AtButton onClick={() => {
      authing.logout();
      Taro.reLaunch({url: '/pages/yuque/index'})
    }}
    >退出登录</AtButton>
  </View>
}
