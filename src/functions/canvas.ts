import Taro, {CanvasContext} from "@tarojs/taro";
import {naiveErrorHandler} from "@/functions/naiveErrorHandler";

export const drawImageFully = async (imagePath, ctx: CanvasContext, canvasId, sx = 0, sy = 0) => {
  const query = Taro.createSelectorQuery();
  const h5CanvasSelector = `canvas[canvas-id=${canvasId}]`;

  const canvas = Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? query.select('#' + canvasId) :
    query.select(h5CanvasSelector);

  canvas.boundingClientRect(canvasRes => {
    const {width: canvasWidth, height: canvasHeight} = canvasRes;
    Taro.getImageInfo({src: imagePath}).then((res) => {
      const {width: imageWidth, height: imageHeight} = res;

      const diff = imageWidth - imageHeight;

      if (imageWidth > imageHeight) {
        sx = diff / 2;
        sy = 0;
      }

      const imageRatio = imageWidth / imageHeight;

      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        ctx.scale(canvasWidth / imageWidth, canvasHeight / imageHeight / imageRatio);
        ctx.drawImage(imagePath, sx, sy);
      } else {
        const h5Canvas = document.querySelector(h5CanvasSelector);
        if (h5Canvas) {
          h5Canvas.width = canvasWidth;
          h5Canvas.height = canvasHeight;
        }

        ctx = ctx['__raw__'];
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, sx, sy, imageWidth - diff, imageHeight, 0, 0, canvasWidth, canvasHeight);
        }
        image.src = res.path;
      }
    }).catch(naiveErrorHandler)
  }).exec();
}
