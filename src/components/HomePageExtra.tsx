import {AtFab} from "taro-ui";
import Taro from "@tarojs/taro";
import {Swiper, SwiperItem, Text, View} from "@tarojs/components";

export const Fab = () =><View className='fab-area'>
  <AtFab onClick={() => Taro.navigateToMiniProgram({
    appId: 'wx71b447f4cd52b251',
    path: '',
    extraData: {},
    envVersion: 'release'
  })}
  >
    <Text className='at-fab__icon at-icon at-icon-edit'></Text>
  </AtFab>
</View>

export const Banner = ()=><Swiper
  className='test-h'
  indicatorColor='#999'
  indicatorActiveColor='#333'
  vertical
  circular
  indicatorDots
  autoplay
>
  <SwiperItem>
    <View className='demo-text-1'>1</View>
  </SwiperItem>
  <SwiperItem>
    <View className='demo-text-2'>2</View>
  </SwiperItem>
  <SwiperItem>
    <View className='demo-text-3'>3</View>
  </SwiperItem>
</Swiper>

