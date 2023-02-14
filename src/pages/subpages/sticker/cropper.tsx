import Taro, {CanvasContext, useReady} from "@tarojs/taro";
import {drawImageFully} from "@/functions/canvas";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {Canvas, View} from "@tarojs/components";
import {AtButton} from "taro-ui";
import {useState} from "react";
import {poll} from "@/functions/poll";

const Cropper = () => {
  const [context, setContext] = useState<CanvasContext | undefined>(undefined)

  useReady(() => {
    setContext(Taro.createCanvasContext('sticker-canvas'))
  })
  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera', 'user', 'environment'],
    }).then((res) => {
      poll(() => context !== undefined, 1000, 1000).then(() => {
      })

      drawImageFully(res.tempFilePaths[0], context!, 'sticker-canvas').then(() => {
        console.log('drawn');
      })
    }).catch(naiveErrorHandler);
  };

  return <View>
    <View className='at-article__h1'>你也可以制作！</View>
    <View className='at-article__content'>
      上传图片，自动裁剪成微信表情尺寸。
    </View>
    <AtButton onClick={chooseImage}>选择照片</AtButton>
    <View>
      <Canvas canvasId='sticker-canvas' id='sticker-canvas' style='width: 300px; height: 300px;'></Canvas>
    </View>
  </View>
}

export default Cropper
