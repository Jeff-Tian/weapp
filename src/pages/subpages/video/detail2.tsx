import {View} from "@tarojs/components"
import {gql, useMutation, useQuery} from "@apollo/client";
import Taro from '@tarojs/taro'
import * as assert from "assert";
import {AtActivityIndicator} from "taro-ui";
import * as util from "util";
import MyVideo from "@/components/MyVideo";

const VideoPage2 = () => {
  const params = Taro.getCurrentInstance()?.router?.params

  assert.ok(params, '本页必须传递知乎回答 url')

  const {url} = params
  console.log('url = ', url)

  const VIDEO_QUERY = gql`query GetVideo {
    video
  }`

  const VIDEO_MUTATION = gql`mutation SetVideoCache {
    setVideoSrcCache
  }`

  const {loading, error, data} = useQuery(VIDEO_QUERY)
  
  useMutation(VIDEO_MUTATION)

  if (loading) {
    return <AtActivityIndicator mode='center' size={128} content='加载中……' isOpened />
  }

  if (error) {
    return <View>${util.inspect(error)}</View>
  }

  return <MyVideo src={data.video} />;
}

export default VideoPage2
