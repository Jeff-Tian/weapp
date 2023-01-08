import {Video, View} from "@tarojs/components";

const MyVideo = ({src}) => <View>
  <Video
    id='video'
    src={src}
    // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
    initialTime={0}
    controls
    autoplay={false}
    loop={false}
    muted={false}
  /></View>;

export default MyVideo;
