import SinglePageLayout from "@/layout/single-page-layout";
import {View} from "@tarojs/components";
import LinkedImage from "@/components/LinkedImage";
import Cropper from "@/pages/subpages/sticker/cropper";

const Sticker = () => {
  return <SinglePageLayout height='200vh'>
    <View className='at-article'>
      <View
        className='at-article__h1'
      >点击下图进入预览模式，然后长按识别二维码（或者保存到本地然后扫一扫），领取微信表情：</View>
      <LinkedImage
        src='https://i2.lensdump.com/i/TiEvVm.png'
        mode='widthFix'
      />
    </View>
    <Cropper />
  </SinglePageLayout>
}

export default Sticker

definePageConfig({
  navigationBarTitleText: '领取"哈德韦"出品微信表情',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
