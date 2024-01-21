import SinglePageLayout from "@/layout/single-page-layout";
import Taro, {ENV_TYPE, useAddToFavorites, useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {useEffect, useState} from "react";
import {OfficialAccount, View} from "@tarojs/components";
import {AtButton, AtDivider} from "taro-ui";
import {OfficialAccountCard} from "@/components/OfficialAccountWrapper";
import LinkedImage from "@/components/LinkedImage";
import {User} from "@authing/guard-react";
import {login} from "@/common/login";

const RedPackage = () => {
  useShareAppMessage(() => {
    const displayName = user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''

    if (displayName.indexOf('哈德韦') >= 0) {
      return {
        title: `${user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''}送你一张特别的"哈小龙"红包🧧封面！`,
        path: '/pages/subpages/red-package/dragon',
        imageUrl: 'https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
      }
    }

    return {
      title: `${user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''}送你一张特别的"哈小龙"红包🧧封面！`,
      path: '/pages/subpages/react-view/webview?src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA',
      imageUrl: 'https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
    }
  })

  useShareTimeline(() => {
    return {
      title: `${user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''}送你一张特别的"哈小龙"红包🧧封面！`,
      query: 'src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA',
      imageUrl: 'https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
    }
  })

  useAddToFavorites(() => {
    return {
      title: `${user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''}送你一张特别的"哈小龙"红包🧧封面！`,
      query: 'src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA',
      imageUrl: 'https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
    }
  })

  useEffect(() => {
    Taro.onCopyUrl(() => {
      return {
        query: 'src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA',
      }
    });

    return () => {
      Taro.offCopyUrl(() => {
        return {
          query: 'src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA',
        }
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  const params = Taro.getCurrentInstance()?.router?.params

  const {src} = params

  if (src && src.length > 0) {
    Taro.showToast({
      title: src,
      duration: 5000
    });
    login().then(setUser).catch(console.error).finally(() => {
      const displayName = user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''
      if (displayName.indexOf('哈德韦') >= 0) {
      } else {
        Taro.navigateTo({
          url: '/pages/subpages/react-view/webview?src=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FkBUKusrdKPubi3t34PcSNA'
        })
      }
    })

    return <View>跳转中……</View>
  }

  const shareRedPackage = () => {
    Taro.showShareMenu({
      withShareTicket: true,
    })
  };

  function getRedPackage() {
    setLoading(true)

    login().then(setUser).catch(console.error).finally(() => {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        Taro.showRedPackage({
          url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=v3s9Xd0QsDA&check_type=2#wechat_redirect',
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
        window.open('https://mp.weixin.qq.com/s/kBUKusrdKPubi3t34PcSNA')
        setLoading(false)
      }

    })
  }

  return <SinglePageLayout bgColor='rgb(212, 86, 69)' padding='0' showHeader={false}>
    <View className='at-article'>
      <View className='at-article__content'>
        <View className='at-article__section'>
          <View className='at-article_p'>送你一张特别的微信红包封面，它是使用 GenAI 文本指令画出来的一条中国龙。</View>
        </View>

        <AtButton type='primary' loading={loading}
          onClick={getRedPackage}
        >点击领取&quot;哈小龙&quot;红包🧧封面：</AtButton>

        <AtButton type='secondary' loading={loading} openType='share' onClick={shareRedPackage}>送给朋友</AtButton>

        <View className='at-article__section'>
          <LinkedImage mode='widthFix'
            src='https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
          />
        </View>

        <AtButton type='primary' loading={loading}
          onClick={getRedPackage}
        >点击领取&quot;哈小龙&quot;红包🧧封面：</AtButton>

        <View className='at-article__section'>
          <View className='at-article__h2'>你也可以制作！</View>
          <View className='at-article__info'>关注公众号“哈德韦”，给作者打个赏，我教你！</View>
          <LinkedImage mode='widthFix'
            src='https://mmcomm.qpic.cn/wx_redskin/GP64KknEwj3sMW4qkj041icMxE0X1eXEw3Jpia5Vuuo85968Iib4xXW5glwicfWDdSLY/'
          />
        </View>
        <AtDivider>
          {Taro.getEnv() === ENV_TYPE.WEAPP && <OfficialAccount />}
        </AtDivider>
        <AtDivider />
        <OfficialAccountCard />
      </View>
    </View>
  </SinglePageLayout>
}

export default RedPackage

definePageConfig({
  navigationBarTitleText: '领取"哈小龙"红包🧧封面',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
