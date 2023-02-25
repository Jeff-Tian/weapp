import SinglePageLayout from "@/layout/single-page-layout";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import {useEffect} from "react";

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

  useEffect(gotoBrickverse, [])

  return <SinglePageLayout>
    <AtButton type='primary' onClick={gotoBrickverse}>立即进入 Brickverse！</AtButton>
  </SinglePageLayout>
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
