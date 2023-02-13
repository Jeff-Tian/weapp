import Taro, {CanvasContext} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const drawImageFully = async (imagePath, ctx: CanvasContext, canvasId) => {
  const query = Taro.createSelectorQuery();
  query.select('canvas[canvas-id=' + canvasId + ']').boundingClientRect(canvas => {
    console.log('canvas = ', canvas, ', imagePath = ', imagePath);
    const {width: canvasWidth, height: canvasHeight} = canvas;

    Taro.getImageInfo({src: imagePath}).then(({width: imageWidth, height: imageHeight}) => {
      const ratio = imageWidth / imageHeight;
      console.log('ratio = ', ratio, canvasWidth, imageWidth, canvasHeight, imageHeight);

      ctx.scale(canvasWidth / imageWidth, canvasHeight / imageHeight / ratio);

      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        ctx.drawImage(imagePath, 0, 0);
      } else {
        ctx.drawImage(imagePath, 0, 0, canvasWidth, canvasHeight);
      }
    }).catch(naiveErrorHandler)
  }).exec();
}
