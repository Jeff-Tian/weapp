import {GET_POST_QUERY} from "@/api/brickverse";
import {useQuery} from "@apollo/client";
import Taro from "@tarojs/taro";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import {View} from "@tarojs/components";
import {useContext} from "react";
import {AppContext, AppNameEnum} from "@/app-context";
import Banner from "@/components/brickverse/banner";
import PostItem from "@/components/brickverse/post-item";

import './post.styl';
import SimpleLayout from "@/layout/simple-layout";

if (process.env.TARO_ENV !== 'h5') {
  require('@tarojs/taro/html.css')
}

const Post = () => {

  const {setAppName} = useContext(AppContext);
  setAppName(AppNameEnum.brickverse);

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

  return (
    <SimpleLayout bgColor='white'>
      <PostItem title={data.post.data.attributes.Title} content={data.post.data.attributes.Content} />
      <View style={{color: 'red', fontWeight: 'bold', fontSize: 'xx-large'}}>以上内容和以下内容均由
        https://strapi.brickverse.dev/admin 编辑</View>
      <Banner />
    </SimpleLayout>
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
