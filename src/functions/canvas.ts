import Taro, {CanvasContext} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const drawImageFully = async (imagePath, ctx: CanvasContext, canvasId) => {
  const query = Taro.createSelectorQuery();
  query.select('#' + canvasId).boundingClientRect(({height: canvasHeight, width: canvasWidth}) => {
    Taro.getImageInfo({src: imagePath}).then(({width: imageWidth, height: imageHeight}) => {
      const ratio = imageWidth / imageHeight;

      ctx.scale(canvasWidth / imageWidth, canvasHeight / imageHeight / ratio);

      ctx.drawImage(imagePath, 0, 0);
    }).catch(naiveErrorHandler)
  }).exec();
}
