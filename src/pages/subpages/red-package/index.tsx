import SinglePageLayout from "@/layout/single-page-layout";
import Taro, {ENV_TYPE, useShareAppMessage} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {useEffect, useState} from "react";
import {OfficialAccount, View} from "@tarojs/components";
import {AtButton, AtDivider} from "taro-ui";
import {OfficialAccountCard} from "@/components/OfficialAccountWrapper";
import LinkedImage from "@/components/LinkedImage";
import {login} from "@/components/LoginStatus/weapp";
import {User} from "@authing/guard-react";

const RedPackage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function getRedPackage() {
    setLoading(true)

    login().then(setUser).catch(console.error).finally(() => {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        Taro.showRedPackage({
          url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=nGeAmofNueP&check_type=2#wechat_redirect',
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
        window.open('https://mp.weixin.qq.com/s?__biz=MzAxNTk3ODgxNA==&mid=2247486411&idx=1&sn=5c25d31fa88e512d51ed46b73681df00&chksm=9bfa939aac8d1a8ceb874c2437bcfd29f34cdf36f6e8361c3b415da1b5fd03a38d4d9bd52d9a&token=1812046516&lang=zh_CN#rd')
        setLoading(false)
      }

    })
  }

  useEffect(() => {
    Taro.setBackgroundColor({
      backgroundColor: 'rgb(212, 86, 69)',
      backgroundColorTop: 'rgb(212, 86, 69)',
      backgroundColorBottom: 'rgb(212, 86, 69)',
    })
  }, [])

  useShareAppMessage(() => {
    return {
      title: `${user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''}送你一张特别的"哈小兔"红包🧧封面！`,
      path: '/pages/subpages/red-package/index',
      imageUrl: 'https://i1.lensdump.com/i/RxEd2z.th.jpeg'
    }
  })

  return <SinglePageLayout bgColor='rgb(212, 86, 69)' padding='0'>
    <View className='at-article'>
      <View className='at-article__content'>
        <View className='at-article__section'>
          <View className='at-article_p'>送你一张特别的微信红包封面，它是使用支付宝的 AI
            年画功能制作，并基于区块链技术做为数字藏品被收藏了。</View>
        </View>

        <AtButton type='primary' loading={loading}
                  onClick={getRedPackage}
        >点击领取&quot;哈小兔&quot;红包🧧封面：</AtButton>

        <View className='at-article__section'>
          <LinkedImage mode='widthFix'
                       src='https://i3.lensdump.com/i/RxEVY5.md.png'
          />
        </View>

        <AtButton type='primary' loading={loading}
                  onClick={getRedPackage}
        >点击领取&quot;哈小兔&quot;红包🧧封面：</AtButton>

        <View className='at-article__section'>
          <View className='at-article__h2'>你也可以制作！</View>
          <View className='at-article__info'>先点击下图，再长按保存，然而使用支付宝扫码，即可制作你自己的红包封面！</View>
          <LinkedImage mode='widthFix' src='https://i1.lensdump.com/i/RxEd2z.md.jpeg'/>
        </View>
        <AtDivider>
          {Taro.getEnv() === ENV_TYPE.WEAPP && <OfficialAccount/>}
        </AtDivider>
        <AtDivider/>
        <OfficialAccountCard/>
      </View>
    </View>
  </SinglePageLayout>
}

export default RedPackage
