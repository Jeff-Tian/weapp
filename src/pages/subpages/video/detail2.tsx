import {View} from "@tarojs/components"
import {gql, useMutation, useQuery} from "@apollo/client";
import Taro from '@tarojs/taro'
import {AtActivityIndicator} from "taro-ui";
import * as util from "util";
import MyVideo from "@/components/MyVideo";

const VideoPage2 = () => {
  // const params = Taro.getCurrentInstance()?.router?.params

  // assert.ok(params, '本页必须传递知乎回答 url')

  // const {url} = params
  // console.log('url = ', url)

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

  return Taro.getEnv() === Taro.ENV_TYPE.WEB ? <MyVideo src={data.video} /> :
    <View>本小程序使用 Taro 多端框架开发，本页专供 Web 端使用，微信端小程序不支持。</View>
    ;
}

export default VideoPage2
