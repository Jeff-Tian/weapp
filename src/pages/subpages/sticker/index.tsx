import SinglePageLayout from "@/layout/single-page-layout";
import {Image, View} from "@tarojs/components";

const Sticker = () => {
  return <SinglePageLayout>
    <View className='at-article'>
      <View className='at-article__h1'>识别下面的二维码，领取微信表情：</View>
      <Image
        src='https://i2.lensdump.com/i/TiEvVm.png'
        mode='widthFix'
      />
    </View>
  </SinglePageLayout>
}

export default Sticker

definePageConfig({
  navigationBarTitleText: '领取"哈小兔"得偿所愿微信表情',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
