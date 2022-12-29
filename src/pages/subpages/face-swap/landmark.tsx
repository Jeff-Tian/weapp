import SinglePageLayout from "@/layout/single-page-layout";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";
import {Canvas} from "@tarojs/components";

const Landmark = () => {
  const context = Taro.createCanvasContext('canvas')

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

  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((res) => {
      console.log('files = , ', res);
      const [image] = res.tempFiles

      context.drawImage(res.tempFilePaths[0], 0, 0, 200, 200)
      context.draw();

      return Taro.uploadFile({
        url: 'https://sls.pa-ca.me/face-swap/landmark',
        filePath: image.path,
        name: 'image'
      }).then(r => {
        console.log('res = ', r);
        let {data: points} = r
        console.log('points = ', points);

        points = JSON.parse(points);
        console.log('points = ', points);


        context.drawImage(res.tempFilePaths[0], 0, 0)

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
    <Canvas canvasId='canvas' style='width: 100%; min-height: 500px;'></Canvas>
  </SinglePageLayout>
}
export default Landmark
