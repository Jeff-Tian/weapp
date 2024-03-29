import {View} from "@tarojs/components"
import {gql, useQuery} from "@apollo/client";
import Taro from '@tarojs/taro'
import {AtActivityIndicator} from "taro-ui";
import * as util from "util";
import MyVideo from "@/components/MyVideo";

const ResourceDetail = () => {
  const params = Taro.getCurrentInstance()?.router?.params

  // assert.ok(params, '本页必须传递知乎回答 url')

  // const {url} = params
  // console.log('url = ', url)

  const ICLOUD_RESOURCE_QUERY = gql`query icloudResourceQuery {
    downloadUrlOfICloudSharing(shortGUID: "${params?.shortGuid}") {
      downloadURL
    }
  }`

  const {loading, error, data} = useQuery(ICLOUD_RESOURCE_QUERY)

  if (loading) {
    return <AtActivityIndicator mode='center' size={128} content='加载中……' isOpened />
  }

  if (error) {
    return <View>${util.inspect(error)}</View>
  }

  return <MyVideo src={data.downloadUrlOfICloudSharing.downloadURL} />    ;
}

export default ResourceDetail

definePageConfig({
  navigationBarTitleText: '获取资源',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
