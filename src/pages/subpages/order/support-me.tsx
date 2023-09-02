import SinglePageLayout from "@/layout/single-page-layout";
import { View } from "@tarojs/components";
import LinkedImage from "@/components/LinkedImage";
import { AtButton, AtDivider } from "taro-ui";
import Taro from "@tarojs/taro";
import * as util from "util";

const askForAuthorizationToSaveImage = async () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    Taro.showToast({
      title: '请使用微信扫一扫下面的二维码',
      icon: 'none'
    })

    return
  }

  try {
    const authed = await Taro.authorize({ scope: 'scope.writePhotosAlbum' })
    console.log(authed)

    const qrImageUrl = 'https://v.pa-pa.me/images/we-com-pay.png';

    Taro.downloadFile({
      url: qrImageUrl,
      success: (res) => {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        }).then(r => {
          console.log(r)
          return Taro.showModal({
            title: `二维码图片保存成功`,
            content: `现在请关闭本小程序，然后使用微信扫一扫，并从相册中选择该图片`,
            showCancel: false,
            confirmText: '好的',
            success: (ok => {
              if (ok.confirm) {
                Taro.exitMiniProgram({})
              }
            })
          })
        }).then(r => {
          console.log(r)
          Taro.scanCode({
            success: (rs) => {
              console.log(rs)
              Taro.showModal({
                title: '扫码结果',
                content: util.inspect(rs),
                showCancel: true,
                confirmText: '退出',
                success: (result) => {
                  if (result.cancel) {

                  }

                  if (result.confirm) {
                    Taro.exitMiniProgram({})
                  }
                },
              })
            }
          })
        }).catch(e => console.log(e))
      }
    }).then(console.log).catch(ex => {
      Taro.showModal({
        title: '下载二维码图片失败',
        content: `${util.inspect(ex)}  ${qrImageUrl}`,
        showCancel: false,
        confirmText: '我知道了',
        success: (res) => {
          console.log(res)
          if (res.confirm) {

          }

          if (res.cancel) {

          }
        },
      })
    })
  } catch (ex) {
    Taro.showToast({
      title: '授权失败，请手动长按二维码图片保存',
      icon: 'error',
    }).then(r => console.log(r)).catch(e => console.error(e))
  }
};

const SupportMe = () => {

  return Taro.getEnv() === Taro.ENV_TYPE.WEB ? <SinglePageLayout>
    <View className='at-article'>
      <View className='at-article__h1'>支持哈德韦</View>
      <View className='at-article__content'>
        <View className='at-article__h2'>
          谢谢你的支持！请允许保存图片到相册（或者长按以下图片自行保存），然后使用微信扫一扫选择相册中的图片，即可赞赏哈德韦。
        </View>
      </View>
      <AtDivider content='' />
      <View className='at-article__section'>
        <AtButton type='primary' onClick={askForAuthorizationToSaveImage}>同意授权并赞赏</AtButton>
      </View>
      <AtDivider content='' />
      <View className='at-article__content'>
        <LinkedImage src='https://v.pa-pa.me/images/we-com-pay.png' href='https://v.pa-pa.me/images/we-com-pay.png'
          mode='aspectFit'
        />
      </View>
    </View>
  </SinglePageLayout> : <View>本小程序使用 Taro 多端框架开发，本页专供 Web 端使用，微信端小程序不支持。</View>
}

export default SupportMe
