import {AtButton, AtDivider} from "taro-ui";
import Taro from "@tarojs/taro";
import {useContext, useEffect} from "react";
import LinkedImage from "@/components/LinkedImage";
import SimpleLayout from "@/layout/simple-layout";
import {AppContext, AppNameEnum} from "@/app-context";

const Brickverse = () => {
  const gotoBrickverse = () => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      Taro.navigateToMiniProgram({
        appId: 'wx9fe2a6e64bfa9dd6',
        path: `/pages/subpages/webview/index?src=${encodeURIComponent('https://brickverse.pa-ca.me/')}`,
        envVersion: 'release'
      })

      return;
    }

    window.location.href = "https://brick.cat"
  };

  const params = Taro.getCurrentInstance()?.router?.params
  const {auto} = params

  useEffect(auto !== 'true' ? () => {
  } : gotoBrickverse, [])


  const {setAppName} = useContext(AppContext);

  setAppName(AppNameEnum.brickverse);

  return <SimpleLayout bgColor='white'>
    <AtButton type='primary' onClick={gotoBrickverse}>立即进入 Brickverse！</AtButton>
    <LinkedImage mode='widthFix' src='https://www.brick.cat/static/media/benny.9fa238f11aec0cbaf24f.png'
      href='https://brick.cat'
    />
    <AtDivider />
    <LinkedImage mode='widthFix' src='https://i3.lensdump.com/i/TV0CFz.jpeg' href='https://brick.cat' />
  </SimpleLayout>

}

export default Brickverse

definePageConfig({
  navigationBarTitleText: '即将进入 Brickverse！',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
