import SinglePageLayout from "@/layout/single-page-layout";
import Taro from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtButton, AtDivider} from "taro-ui";
import {OfficialAccountCard} from "@/components/OfficialAccountWrapper";

const RedPackage = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      Taro.showRedPackage({
        url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=menUMX5CV8N&check_type=2#wechat_redirect',
        success: (res) => {
          console.log(res)
        },
        fail: (err) => {
          naiveErrorHandler(err)
        },
        complete: () => {
          setLoading(false)
        }
      })
    } else {
      setLoading(false)
    }
  }, [])

  return <SinglePageLayout>
    <View>
      {
        Taro.getEnv() === Taro.ENV_TYPE.WEB &&
        <AtButton
          onClick={() => window.open('https://mp.weixin.qq.com/s?__biz=MzAxNTk3ODgxNA==&mid=2247486411&idx=1&sn=5c25d31fa88e512d51ed46b73681df00&chksm=9bfa939aac8d1a8ceb874c2437bcfd29f34cdf36f6e8361c3b415da1b5fd03a38d4d9bd52d9a&token=1812046516&lang=zh_CN#rd')}
        >点击领取&quot;哈小兔&quot;红包🧧封面：</AtButton>
      }
    </View>
    {
      loading ? <View>加载中……</View> : null
    }
    <AtDivider />
    <OfficialAccountCard />
  </SinglePageLayout>
}

export default RedPackage
