import {AtAvatar} from "taro-ui";
import {Swiper, SwiperItem, View, Image} from "@tarojs/components";
import StackOverflowWrapper from "@/components/StackOverflowWrapper";
import {handleClipboard} from "@/functions/clipboard";
import Taro from "@tarojs/taro";
import LinkedInWrapper from "@/components/LinkedInWrapper";
import './banner.styl';

export const Fab = () => <View className='fab-area' onClick={handleClipboard}>
  <AtAvatar circle image='https://avatars.githubusercontent.com/u/3367820?v=4'></AtAvatar>
</View>

export const Banner = () => <Swiper
  indicatorColor='#999'
  indicatorActiveColor='#333'
  circular
  indicatorDots
  autoplay
  full
  displayMultipleItems={1}
  className='banner'
>
  <SwiperItem className='banner-item' onClick={() => Taro.navigateTo({url: '/pages/subpages/tictactoe/ai'})}>
    <Image
      src='https://repository-images.githubusercontent.com/112730526/90ecaf80-b2eb-11e9-9c91-5cd6607772da'
      mode='widthFix'
    />
  </SwiperItem>
  <SwiperItem className='banner-item'>
    <StackOverflowWrapper />
  </SwiperItem>
  <SwiperItem className='banner-item'>
    <LinkedInWrapper />
  </SwiperItem>
</Swiper>

