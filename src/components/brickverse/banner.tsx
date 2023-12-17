import {Swiper, SwiperItem, View} from "@tarojs/components";
import {GET_POSTS_QUERY} from "@/api/brickverse";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import {useQuery} from "@apollo/client";
import Taro from "@tarojs/taro";
import MarkdownViewer from "@/components/markdown-viewer";

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
        <View style={{ padding: '0 2em' }} className='at-article__content taro_html'>
          {/*<MarkdownViewer markdown={post.attributes.Content} />*/}
          <View dangerouslySetInnerHTML={{__html: post.attributes.Content.replace(/&nbsp;/g, ' ')}}></View>
        </View>
      </SwiperItem>)
    }
  </Swiper>
}

export default Banner;
