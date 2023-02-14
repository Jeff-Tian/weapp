import Taro, {CanvasContext} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const drawImageFully = async (imagePath, ctx: CanvasContext, canvasId) => {
  const query = Taro.createSelectorQuery();
  const canvas = Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? query.select('#' + canvasId) :
    query.select('canvas[canvas-id=' + canvasId + ']');

  canvas.boundingClientRect(canvasRes => {
    const {width: canvasWidth, height: canvasHeight} = canvasRes;

    Taro.getImageInfo({src: imagePath}).then((res) => {
      const {width: imageWidth, height: imageHeight} = res;
      const imageRatio = imageWidth / imageHeight;

      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        console.log('imagePath = ', imagePath);
        ctx.scale(canvasWidth / imageWidth, canvasHeight / imageHeight / imageRatio);
        ctx.drawImage(imagePath, 0, 0);
      } else {
        window.ctx = ctx;
        ctx = ctx['__raw__'];
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, canvasWidth, canvasHeight);
        }
        image.src = res.path;
      }
    }).catch(naiveErrorHandler)
  }).exec();
}
