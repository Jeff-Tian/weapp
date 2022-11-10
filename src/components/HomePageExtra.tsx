import {AtFab} from "taro-ui";
import Taro from "@tarojs/taro";
import {Swiper, SwiperItem, Text, View, Image} from "@tarojs/components";

export const Fab = () => <View className='fab-area'>
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
    <Image
      className='at-article__img'
      src='https://stackoverflow-readme-profile.johannchopin.fr/profile/769900?theme=dark&website=true&location=true'
      mode='scaleToFill'
    />
  </SwiperItem>
</Swiper>

