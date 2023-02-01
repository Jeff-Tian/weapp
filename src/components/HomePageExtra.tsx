import {AtAvatar} from "taro-ui";
import {Swiper, SwiperItem, View, Image} from "@tarojs/components";
import OfficialAccountWrapper from "@/components/OfficialAccountWrapper";
import StackOverflowWrapper from "@/components/StackOverflowWrapper";
import LinkedImage from "@/components/LinkedImage";
import {handleClipboard} from "@/functions/clipboard";
import Taro from "@tarojs/taro";

export const Fab = () => <View className='fab-area' onClick={handleClipboard}>
  <AtAvatar circle image='https://avatars.githubusercontent.com/u/3367820?v=4'></AtAvatar>
</View>

export const Banner = () => <Swiper
  className='test-h'
  indicatorColor='#999'
  indicatorActiveColor='#333'
  circular
  indicatorDots
  autoplay
>
  <SwiperItem onClick={() => Taro.navigateTo({url: '/pages/subpages/red-package/index'})}>
    {Taro.getEnv() === Taro.ENV_TYPE.WEB ? <LinkedImage src='https://i1.lensdump.com/i/RxEd2z.md.jpeg'
      href='https://taro.pa-ca.me/pages/subpages/red-package/index'
      mode='widthFix'
    /> : <Image src='https://i1.lensdump.com/i/RxEd2z.md.jpeg' mode='widthFix' />
    }
  </SwiperItem>
  <SwiperItem onClick={() => Taro.navigateTo({url: '/pages/subpages/sticker/index'})}>
    <Image
      src='https://i3.lensdump.com/i/TiELvi.jpeg'
      mode='widthFix'
    />
  </SwiperItem>
  <SwiperItem>
    <StackOverflowWrapper />
  </SwiperItem>
  <SwiperItem>
    <OfficialAccountWrapper />
  </SwiperItem>
  <SwiperItem>
    <LinkedImage src='https://picd.zhimg.com/v2-246288a8f323592fed53cc347aaa65c9_r.jpg?source=172ae18b'
      href='https://picd.zhimg.com/v2-246288a8f323592fed53cc347aaa65c9_r.jpg?source=172ae18b'
      mode='widthFix'
    />
  </SwiperItem>
</Swiper>

