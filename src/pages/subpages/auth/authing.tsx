import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {AtActivityIndicator} from "taro-ui";
import {useEffect, useState} from "react";
import {AuthenticationClient} from "authing-wxapp-sdk";
import HardwayLayout from '../../../layout/hardway-layout';
import {memoizedAsync} from "../../../common/helpers";


const authing = new AuthenticationClient({
  userPoolId: '620097b69a9dab5e967d0c44',
  appId: '620097b7f7c964210b8f7431'
})


const login = async () => {
  const {code} = await Taro.login()
   // 成功登录，将 token 写入微信 Storage
  return await authing.loginByCode(code)
}

const LoginStatus = () => {
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
    {!loading ? <View>欢迎，{JSON.stringify(user)}</View> : null}
  </View>
}

const Authing = () => {


  return <HardwayLayout><View>
    通过 Authing 登录
    <LoginStatus />
  </View></HardwayLayout>
}

export default Authing
