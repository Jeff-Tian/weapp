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

      if (imageWidth < imageHeight) {
        sx = 0;
        sy = -diff / 2;
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
        image.onload = function () {
          // step 1
          const oc = document.createElement('canvas');
          const octx = oc.getContext('2d');
          oc.width = this.width;
          oc.height = this.height;

          // step 2: pre-filter image using steps as radius
          const steps = (oc.width / canvasWidth) >> 1;
          octx.filter = `blur(${steps}px)`;
          octx.drawImage(this, 0, 0);

          ctx.drawImage(oc, sx, sy, imageWidth - Math.max(diff, 0), imageHeight - Math.max(-diff, 0), 0, 0, canvasWidth, canvasHeight);
        }
        image.src = res.path;
      }
    }).catch(naiveErrorHandler)
  }).exec();
}
