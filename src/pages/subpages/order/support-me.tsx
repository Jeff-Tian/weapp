import SinglePageLayout from "@/layout/single-page-layout";
import {View} from "@tarojs/components";
import LinkedImage from "@/components/LinkedImage";
import {AtButton, AtDivider} from "taro-ui";
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
    const authed = await Taro.authorize({scope: 'scope.writePhotosAlbum'})
    console.log(authed)

    Taro.downloadFile({
      url: 'https://v.pa-pa.me/images/we-com-pay.png',
      success: (res) => {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        }).then(r => {
          console.log(r)
          Taro.showToast({
            title: `二维码图片保存成功，请使用微信扫一扫，并从相册中选择该图片`,
            icon: 'success'
          })
        }).then(r => {
          console.log(r)
          Taro.scanCode({
            success: (rs) => {
              console.log(rs)
            }
          })
        }).catch(e => console.log(e))
      }
    }).then(console.log).catch(ex => {
      Taro.showModal({
        title: '下载二维码图片失败',
        content: util.inspect(ex),
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
      title: '极权失败，请手动长按二维码图片保存',
      icon: 'error',
    }).then(r => console.log(r)).catch(e => console.error(e))
  }
};

const SupportMe = () => {

  return <SinglePageLayout>
    <View className='at-article'>
      <View className='at-article__h1'>支持哈德韦</View>
      <View className='at-article__content'>
        <View className='at-article__h2'>
          谢谢你的支持！请允许保存图片到相册（或者长按以下图片自行保存），然后使用微信扫一扫选择相册中的图片，即可赞赏哈德韦。
        </View>
      </View>
      <AtDivider content=''/>
      <View className='at-article__section'>
        <AtButton type='primary' onClick={askForAuthorizationToSaveImage}>同意授权并赞赏</AtButton>
      </View>
      <AtDivider content=''/>
      <View className='at-article__content'>
        <LinkedImage src='https://v.pa-pa.me/images/we-com-pay.png' href='https://v.pa-pa.me/images/we-com-pay.png'
                     mode='aspectFit'
        />
      </View>
    </View>
  </SinglePageLayout>
}

export default SupportMe
