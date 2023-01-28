import SinglePageLayout from "@/layout/single-page-layout";
import {AtButton, AtDivider} from "taro-ui";
import Taro, {CanvasContext, useReady} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {Canvas} from "@tarojs/components";
import {drawImageFully} from "@/functions/canvas";

function drawSmile(context) {
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
}

const Landmark = () => {
  useReady(() => {
    context = Taro.createCanvasContext('canvas')

    drawSmile(context)
  })

  let context: CanvasContext;

  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera', 'user', 'environment'],
    }).then((res) => {
      const [image] = res.tempFiles

      const [imagePath] = res.tempFilePaths

      drawImageFully(imagePath, context, 'canvas').then()

      return Taro.uploadFile({
        url: 'https://sls.pa-ca.me/face-swap/landmark',
        filePath: image.path,
        name: 'image',
        withCredentials: false,
      }).then(r => {
        console.log('res = ', r);
        let {data: points} = r
        console.log('points = ', points);

        points = JSON.parse(points);
        console.log('points = ', points);


        context.setStrokeStyle("#ff0000")
        context.setLineWidth(2)
        context.moveTo(points[0][0], points[0][1])
        for (let i = 1; i < points.length; i++) {
          context.lineTo(points[i][0], points[i][1])
        }
        context.stroke()
        context.draw()

      })
    }).catch(naiveErrorHandler);
  }

  return <SinglePageLayout>
    <AtButton onClick={chooseImage}>选择照片</AtButton>
    <AtDivider content='识别结果' fontColor='#ed3f14' lineColor='#ed3f14' />
    <Canvas canvasId='canvas' id='canvas' style='width: 100%; min-height: 500px;'></Canvas>
  </SinglePageLayout>
}
export default Landmark
