import Taro from "@tarojs/taro";
import {Image} from "@tarojs/components";
import {ImageProps} from "@tarojs/components/types/Image";

const WeappLinkedImage = ({src, mode}) => <Image src={src} mode={mode} onClick={() => {
  Taro.previewImage({
    current: src,
    urls: [src]
  }).then(r => console.log(r))
}} show-menu-by-longpress
  style={{maxWidth: '100%', width: '100%'}}
/>

const H5LinkedImage = ({src, mode, href}) => <a href={href} target='_blank'><WeappLinkedImage src={src}
  mode={mode}
/></a>

const LinkedImage = ({
                       src,
                       mode,
                       href
                     }: { src?: string, mode?: keyof ImageProps.Mode, href?: string }) => {
  if (!src) {
    return null
  }

  return Taro.getEnv() === Taro.ENV_TYPE.WEAPP ?
    <WeappLinkedImage src={src} mode={mode} /> :
    <H5LinkedImage src={src} mode={mode} href={href ?? src} />;
}

export default LinkedImage
