import {GET_POST_QUERY} from "@/api/brickverse";
import {useQuery} from "@apollo/client";
import Taro from "@tarojs/taro";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import {View} from "@tarojs/components";
import WebMarkdownViewer from "@/components/markdown-viewer/h5";
import React from "react";

const Post = () => {
  const {
    data,
    error,
    loading
  } = useQuery(GET_POST_QUERY, {variables: {id: Taro.getCurrentInstance()?.router?.params?.id}})

  if (error) {
    return <ErrorDisplay error={error}>发生了错误！</ErrorDisplay>
  }
  if (loading) {
    return <View>正在加载中……</View>
  }

  console.log('data = ', data);

  return (
    <View className='at-article'>
      <View className='at-article__h1'>{data.post.data.attributes.Title}</View>
      <View className='at-article__content taro_html'>
        <View dangerouslySetInnerHTML={{__html: data.post.data.attributes.Content}} />
      </View>
      <View>以上内容通过 https://strapi.brickverse.dev/admin 编辑</View>
    </View>
  )
}

export default Post


definePageConfig({
  navigationBarTitleText: 'Brickverse',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
