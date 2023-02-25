import Taro, {CanvasContext, useReady} from "@tarojs/taro";
import {drawImageFully} from "@/functions/canvas";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {Canvas, View} from "@tarojs/components";
import {AtButton, AtDivider} from "taro-ui";
import {useState} from "react";
import {poll} from "@/functions/poll";
import LinkedImage from "@/components/LinkedImage";

const downloadFile = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

const downloadPng = (canvas, filename: string) => {
  downloadFile(canvas.toDataURL('image/png'), filename);
};

const Cropper = () => {
  const [contexts, setContexts] = useState<Map<string, CanvasContext>>(new Map())
  const [imagePath, setImagePath] = useState<string | undefined>(undefined)

  useReady(() => {
    setContexts(new Map([['sticker-canvas-240-240', Taro.createCanvasContext('sticker-canvas-240-240')], ['sticker-canvas-120-120', Taro.createCanvasContext('sticker-canvas-120-120')]]))
  })
  const chooseImage = () => {
    setContexts(new Map([['sticker-canvas-240-240', Taro.createCanvasContext('sticker-canvas-240-240')], ['sticker-canvas-120-120', Taro.createCanvasContext('sticker-canvas-120-120')]]))

    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera', 'user', 'environment'],
    }).then((res) => {
      const [tempFilePath] = res.tempFilePaths;
      setImagePath(tempFilePath)

      poll(() => contexts !== undefined && contexts.size === 2, 1000, 10000).then(() => {
        return Promise.all([...contexts].map(([canvasId, context]) => drawImageFully(tempFilePath, context, canvasId)))
      })
    }).catch(naiveErrorHandler);
  };

  const download = () => {
    const gif = new window['GIF']({
      workers: 2,
      quality: 10,
      workerScript: `/static/gif.worker.js`
    });
    gif.addFrame(document.querySelector('canvas[canvas-id=sticker-canvas-240-240]'), {delay: 200});
    gif.on('finished', function (blob) {
      const url = URL.createObjectURL(blob);
      downloadFile(url, '240-240.gif');
    });
    gif.render();

    downloadPng(document.querySelector('[canvas-id=sticker-canvas-120-120]'), '120-120.png');
    downloadPng(document.querySelector('[canvas-id=sticker-canvas-240-240]'), '240-240.png');
  }

  return <View>
    <View className='at-article__h1'>你也可以制作！</View>
    <View className='at-article__content'>
      上传图片，自动裁剪成微信表情尺寸。
    </View>
    <AtButton onClick={chooseImage}>选择照片</AtButton>
    <AtDivider />
    <View>Selected Image</View>
    <LinkedImage
      src={imagePath}
      mode='widthFix'
    />
    <View>240 x 240 (GIF + PNG)</View>
    <Canvas canvasId='sticker-canvas-240-240' id='sticker-canvas-240-240' style='width: 240px; height: 240px;'></Canvas>
    <View>120 x 120 (PNG)</View>
    <Canvas canvasId='sticker-canvas-120-120' id='sticker-canvas-120-120' style='width: 120px; height: 120px;'></Canvas>
    <AtDivider />
    <AtButton onClick={download}>下载/保存</AtButton>
  </View>
}

export default Cropper
