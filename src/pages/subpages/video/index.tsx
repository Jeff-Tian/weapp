import {View, Text, Input, Button} from "@tarojs/components";
import {useState} from "react";
import Taro from "@tarojs/taro";

const ResourceIndex = () => {
  const [resourceId, setResourceId] = useState('02aPe3Jgy3COgyPaWfUJPyfFw')

  const loadResource = () => {
    if (!resourceId) {
      Taro.showToast({
        title: '资源标识不能为空！',
        icon: 'error',
        duration: 1500
      })
      return
    }

    if (resourceId.startsWith("http")) {
      Taro.navigateTo({
        url: `/pages/subpages/video/detail2?url=${encodeURIComponent(resourceId)}`
      })

      return
    }

    if (resourceId.length === "02aPe3Jgy3COgyPaWfUJPyfFw".length) {
      Taro.navigateTo({
        url: `/pages/subpages/video/detail3?shortGuid=${encodeURIComponent(resourceId)}`
      })

      return
    }

    if (resourceId.length === "1492435273367248896".length) {
      Taro.navigateTo({
        url: `/pages/subpages/video/detail?zVideoId=${encodeURIComponent(resourceId)}`
      })

      return
    }

    Taro.showToast({
      title: '暂未识别资源类型！',
      icon: 'error',
      duration: 1500
    })
  }

  return (
    <View className='index'>
      <View>
        <Text selectable>目前支持三种类型的资源：1、使用 zId
          加载知乎资源，如：1492435273367248896；2、使用知乎回答链接加载回答中的资源，如：https://www.zhihu.com/question/378598799/answer/1126026947；3、使用
          ShortGuid 加载
          iCloud 分享的资源，如：02aPe3Jgy3COgyPaWfUJPyfFw。</Text>
      </View>
      <Text>请输入资源标识：</Text>
      <Input type='text' placeholder='请输入资源标识' maxlength={-1}
        onInput={(event) => setResourceId(event.detail.value)}
        onConfirm={loadResource}
        value={resourceId}
      />
      <Button onClick={loadResource}>加载资源</Button>
    </View>
  )
}

export default ResourceIndex

definePageConfig({
  navigationBarTitleText: '获取资源',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
