import {Swiper, SwiperItem, View} from "@tarojs/components";
import {GET_POSTS_QUERY} from "@/api/brickverse";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import {useQuery} from "@apollo/client";
import Taro from "@tarojs/taro";
import WebMarkdownViewer from "@/components/markdown-viewer/h5";

const Banner = () => {
  const {data, error, loading} = useQuery(GET_POSTS_QUERY)
  if (error) {
    return <ErrorDisplay error={error}>发生了错误！</ErrorDisplay>
  }
  if (loading) {
    return <View>正在加载中……</View>
  }

  return <Swiper
    className='brickverse-banner'
    indicatorColor='#999'
    indicatorActiveColor='#333'
    circular
    indicatorDots
    autoplay
  >
    {
      data.posts.data.map((post) => <SwiperItem key={post.id}
        onClick={() => Taro.navigateTo({url: `/pages/subpages/brickverse/post?id=${post.id}`})}
      >
        <View className='at-article__h1'>{post.attributes.Title}</View>
        <View className='at-article__content taro_html'>
          <WebMarkdownViewer markdown={post.attributes.Content} />
        </View>
        <View className='at-article__p'>{post.attributes.Content}</View>
      </SwiperItem>)
    }
  </Swiper>
}

export default Banner;
