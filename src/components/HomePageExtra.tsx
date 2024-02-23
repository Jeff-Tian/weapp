import {AtAvatar} from "taro-ui";
import {Swiper, SwiperItem, View} from "@tarojs/components";
import StackOverflowWrapper from "@/components/StackOverflowWrapper";
import {handleClipboard} from "@/functions/clipboard";

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
  <SwiperItem>
    <StackOverflowWrapper />
  </SwiperItem>

</Swiper>

