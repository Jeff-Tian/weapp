import {View} from "@tarojs/components"
import {gql, useQuery} from "@apollo/client";
import Taro from '@tarojs/taro'
import * as assert from "assert";
import {AtActivityIndicator} from "taro-ui";
import * as util from "util";
import MyVideo from "@/components/MyVideo";

const VideoPage = () => {
  const params = Taro.getCurrentInstance()?.router?.params

  assert.ok(params, '本页必须传递知乎 zvideo id')

  const ZVIDEO_QUERY = gql`query GetVideo {
    getVideoInfoByUrl(zvideoUrl: "https://www.zhihu.com/zvideo/${params.zVideoId}") {
      first {
        playUrl
      }
    }
  }`
  const {loading, error, data} = useQuery(ZVIDEO_QUERY)

  if (loading) {
    return <AtActivityIndicator mode='center' size={128} content='加载中……' isOpened />
  }

  if (error) {
    return <View>${util.inspect(error)}</View>
  }

  return <MyVideo src={data.getVideoInfoByUrl.first.playUrl} />;
}

export default VideoPage
