import {useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtActivityIndicator} from "taro-ui";
import {UserCard} from "@/components/UserCard";
import {login} from "@/common/login";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {User} from "@authing/guard-react";


export const WeappLoginStatus = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    login().then(res => {
      setLoading(false)

      setUser(res)
    }).catch(naiveErrorHandler)
  }, [])

  return <View>
    <AtActivityIndicator mode='center' size={128} content='加载中……'
      isOpened={loading}
    />
    {!loading ? <UserCard userInfo={user || undefined} /> : null}
  </View>
}
