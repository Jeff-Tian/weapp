import SinglePageLayout from "@/layout/single-page-layout";
import {Canvas, View} from "@tarojs/components";
import LinkedImage from "@/components/LinkedImage";
import {AtButton} from "taro-ui";
import Taro, {CanvasContext, useReady} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {drawImageFully} from "@/functions/canvas";

const Sticker = () => {
  let context: CanvasContext;
  useReady(() => {
    context = Taro.createCanvasContext('sticker-canvas')

    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  })
  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera', 'user', 'environment'],
    }).then((res) => {
      console.log('files = , ', res);

      drawImageFully(res.tempFilePaths[0], context, 'sticker-canvas').then(() => {
        console.log('drawn');
      })

      setTimeout(() => {
        context.setStrokeStyle("#ff0000")
        context.setLineWidth(2)
        context.moveTo(10, 10);
        context.lineTo(20, 20);
        context.stroke()
        context.draw();
      }, 100)
      
    }).catch(naiveErrorHandler);
  };

  return <SinglePageLayout>
    <View className='at-article'>
      <View
        className='at-article__h1'
      >点击下图进入预览模式，然后长按识别二维码（或者保存到本地然后扫一扫），领取微信表情：</View>
      <LinkedImage
        src='https://i2.lensdump.com/i/TiEvVm.png'
        mode='widthFix'
      />
    </View>
    <View>
      <View className='at-article__h1'>你也可以制作！</View>
      <View className='at-article__content'>
        上传图片，自动裁剪成微信表情尺寸。
      </View>
      <AtButton onClick={chooseImage}>选择照片</AtButton>
      <View>
        <Canvas canvasId='sticker-canvas' id='sticker-canvas' style='width: 300px; height: 300px;'></Canvas>
      </View>
    </View>
  </SinglePageLayout>
}

export default Sticker

definePageConfig({
  navigationBarTitleText: '领取"哈德韦"出品微信表情',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
