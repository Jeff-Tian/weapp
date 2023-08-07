import Taro, {CanvasContext, useReady} from "@tarojs/taro";
import {drawImageFully} from "@/functions/canvas";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {Canvas, View} from "@tarojs/components";
import {AtButton, AtDivider, AtSlider} from "taro-ui";
import {useEffect, useState} from "react";
import LinkedImage from "@/components/LinkedImage";
import {flushSync} from 'react-dom';

const downloadFile = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

const downloadPng = (canvas, filename: string) => {
  console.log('canvas = ', canvas, canvas.toDataURL);
  downloadFile(canvas.toDataURL('image/png'), filename);
};

const Cropper = () => {
  const [offset, setOffset] = useState(0)
  const [contexts, setContexts] = useState<Map<string, CanvasContext>>(new Map())
  const [imagePath, setImagePath] = useState<string | undefined>(undefined)

  useReady(() => {
    flushSync(() => {
      setContexts(new Map([['sticker-canvas-240-240', Taro.createCanvasContext('sticker-canvas-240-240')], ['sticker-canvas-120-120', Taro.createCanvasContext('sticker-canvas-120-120')]]))
    })
  })
  const chooseImage = () => {
    console.log('contexts = ', contexts);

    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera', 'user', 'environment'],
    }).then((res) => {
      const [tempFilePath] = res.tempFilePaths;
      setImagePath(tempFilePath)

      Promise.all([...contexts].map(([canvasId, context]) => drawImageFully(tempFilePath, context, canvasId, 0, 0, offset))).then(r => {
        console.log('drawed = ', r);
      })
    }).catch(naiveErrorHandler);
  };

  useEffect(() => {
    console.log('offset change!');

    [...contexts].map(([canvasId, context]) => drawImageFully(imagePath, context, canvasId, 0, 0, offset))
  }, [offset])

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

    downloadPng(document.querySelector('canvas[canvas-id=sticker-canvas-120-120]'), '120-120.png');
    downloadPng(document.querySelector('canvas[canvas-id=sticker-canvas-240-240]'), '240-240.png');
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
    <AtSlider onChange={(value) => setOffset(value)} min={-100} max={100} showValue value={offset}></AtSlider>
    <View>240 x 240 (GIF + PNG)</View>
    <Canvas canvasId='sticker-canvas-240-240' id='sticker-canvas-240-240' style='width: 240px; height: 240px;'></Canvas>
    <View>120 x 120 (PNG)</View>
    <Canvas canvasId='sticker-canvas-120-120' id='sticker-canvas-120-120' style='width: 120px; height: 120px;'></Canvas>
    <AtDivider />
    <AtButton onClick={download}>下载/保存</AtButton>
  </View>
}

export default Cropper
