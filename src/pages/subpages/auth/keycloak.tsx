import Taro from '@tarojs/taro'
import HardwayLayout from "@/layout/hardway-layout";
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";
import {AtActivityIndicator} from "taro-ui";
import {memoizedAsync} from "@/common/helpers";

const login = async()=>{
  const {code} = await Taro.login();
  console.log('code = ', code)
  return Taro.request({
    url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(`https://keycloak.jiwai.win/auth/realms/UniHeart/broker/weixin/endpoint?code=${code}&clientId=UniHeart-Client&tabId=QRrSfbxHzaM`)}`,
  });
}

const LoginStatus = ()=>{
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    memoizedAsync(login)().then(res=>{
      console.log('res = ', res)
      setLoading(false);
      setUser(res)
    })

  }, [])

  return <View>
    <AtActivityIndicator mode='center' size={128} content='加载中……' isOpened={loading} />
    {!loading? <View>欢迎，{JSON.stringify(user)}</View>: null}
  </View>
}

const Keycloak = () => <HardwayLayout><View>通过 Keycloak 登录</View><LoginStatus /></HardwayLayout>

export default Keycloak;
