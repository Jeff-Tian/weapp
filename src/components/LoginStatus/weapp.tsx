import {useEffect, useState} from "react";
import {memoizedAsync} from "@/common/helpers";
import {View} from "@tarojs/components";
import {AtActivityIndicator, AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import {UserCard} from "@/components/UserCard";
import {authing, login} from "@/common/login";


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
