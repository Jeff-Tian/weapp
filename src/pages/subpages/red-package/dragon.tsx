import SinglePageLayout from "@/layout/single-page-layout";
import Taro, {ENV_TYPE, useAddToFavorites, useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {useEffect, useState} from "react";
import {OfficialAccount, Swiper, SwiperItem, View} from "@tarojs/components";
import {AtButton, AtDivider} from "taro-ui";
import {OfficialAccountCard} from "@/components/OfficialAccountWrapper";
import LinkedImage from "@/components/LinkedImage";
import {User} from "@authing/guard-react";
import {login} from "@/common/login";
import "./dragon.styl";

const RedPackage = () => {
  useShareAppMessage(() => {
    const displayName = user?.nickname ?? user?.name ?? user?.username ?? user?.preferredUsername ?? user?.email ?? ''

    if (displayName.indexOf('哈德韦') >= 0 || displayName.indexOf('Jeff Tian') >= 0 || displayName.indexOf('wechat_6em1g4') >= 0) {
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


  const dragons = ['https://b.l3n.co/i/45udlM.png',
    'https://c.l3n.co/i/45umra.png',
    'https://b.l3n.co/i/45us4e.png',
    'https://a.l3n.co/i/45u3Pk.png']

  return <SinglePageLayout bgColor='rgb(212, 86, 69)' padding='0' showHeader>
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
          <View className='at-article__info'>关注公众号“哈德韦”，查看红包封面制作教程！</View>
          <View className='at-article__content'>
            由于微信的机制，红包封面的数量是有限的。如果你看到这个红包封面时，已经被领完了，你可以自己制作一张！

            如果你非常喜欢“哈小龙”红包封面的图案，可以点击下面的图片，长按保存到手机相册，可以用作手机壁纸哦！
          </View>
        </View>

        {
          dragons.map((dragon) => <LinkedImage key={dragon} mode='widthFix' src={dragon} />)
        }

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
