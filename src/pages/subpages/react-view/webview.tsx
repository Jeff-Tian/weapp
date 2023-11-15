import {WebView} from "@tarojs/components";
import Taro from "@tarojs/taro";
import assert from "assert";

const Webview = () => {
  const params = Taro.getCurrentInstance()?.router?.params

  assert.ok(params, "本页必须传递参数！")

  const {src} = params

  function handleMessage() {
    console.log('hello')
  }

  return (
    <WebView src={decodeURIComponent(src ?? '')} onMessage={handleMessage} />
  )
}

export default Webview

definePageConfig({
  navigationBarTitleText: '公众号文章',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
