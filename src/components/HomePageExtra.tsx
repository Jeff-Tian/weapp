import {AtAvatar} from "taro-ui";
import {Swiper, SwiperItem, View, Image} from "@tarojs/components";
import OfficialAccountWrapper from "@/components/OfficialAccountWrapper";
import StackOverflowWrapper from "@/components/StackOverflowWrapper";

export const Fab = () => <View className='fab-area'>
  <AtAvatar circle image='https://avatars.githubusercontent.com/u/3367820?v=4'></AtAvatar>
</View>

export const Banner = () => <Swiper
  className='test-h'
  indicatorColor='#999'
  indicatorActiveColor='#333'
  circular
  indicatorDots
  duration={3000}
  interval={5000}
  autoplay
>
  <SwiperItem>
    <StackOverflowWrapper />
  </SwiperItem>
  <SwiperItem>
    <OfficialAccountWrapper />
  </SwiperItem>
</Swiper>

