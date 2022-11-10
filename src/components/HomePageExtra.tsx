import {AtAvatar} from "taro-ui";
import {Swiper, SwiperItem, View, Image} from "@tarojs/components";

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
    <Image
      className='at-article__img'
      src='https://stackoverflow-readme-profile.johannchopin.fr/profile/769900?theme=dark&website=true&location=true'
      mode='scaleToFill'
    />
  </SwiperItem>
</Swiper>

