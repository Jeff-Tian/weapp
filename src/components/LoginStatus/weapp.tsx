import {useEffect, useState} from "react";
import {memoizedAsync} from "@/common/helpers";
import {View} from "@tarojs/components";
import {AtActivityIndicator} from "taro-ui";
import {UserCard} from "@/components/UserCard";
import {login} from "@/common/login";


export const WeappLoginStatus = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    memoizedAsync(login)().then(res => {
      setLoading(false)
      setUser(res)
    })
  }, [])

  return <View>
    <AtActivityIndicator mode='center' size={128} content='加载中……'
      isOpened={loading}
    />
    {!loading ? <UserCard userInfo={user || undefined} /> : null}
  </View>
}
