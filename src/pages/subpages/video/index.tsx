import {Video, View} from "@tarojs/components"

const VideoPage = () => <View> <Video
  id='video'
  src='https://vdn1.vzuu.com/HD/6cd710bc-8d6e-11ec-a8e6-5adc9fccf307-v4_t10000111-wcozlOkqFI.mp4?disable_local_cache=1&auth_key=1645445364-0-0-74ea753b2730d54d2b1e20e0ac8c8b5f&f=mp4&bu=http-com&expiration=1645445364&v=hw'
  poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
  initialTime={0}
  controls
  autoplay={false}
  loop={false}
  muted={false}
/></View>

export default VideoPage
