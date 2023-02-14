import Taro, {CanvasContext} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const drawImageFully = async (imagePath, ctx: CanvasContext, canvasId) => {
  const query = Taro.createSelectorQuery();
  const h5CanvasSelector = `canvas[canvas-id=${canvasId}]`;

  const canvas = Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? query.select('#' + canvasId) :
    query.select(h5CanvasSelector);

  canvas.boundingClientRect(canvasRes => {
    const {width: canvasWidth, height: canvasHeight} = canvasRes;
    console.log('res = ', canvasRes);

    Taro.getImageInfo({src: imagePath}).then((res) => {
      const {width: imageWidth, height: imageHeight} = res;
      console.log('imgres = ', res);
      const imageRatio = imageWidth / imageHeight;

      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        ctx.scale(canvasWidth / imageWidth, canvasHeight / imageHeight / imageRatio);
        ctx.drawImage(imagePath, 0, 0);
      } else {
        const h5Canvas = document.querySelector(h5CanvasSelector);
        if (h5Canvas) {
          h5Canvas.width = canvasWidth;
          h5Canvas.height = canvasHeight;
        }

        ctx = ctx['__raw__'];
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, imageWidth, 1539, 0, 0, canvasWidth, canvasHeight);
        }
        image.src = res.path;
      }
    }).catch(naiveErrorHandler)
  }).exec();
}
