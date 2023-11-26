import {View} from "@tarojs/components";
import {GET_POSTS_QUERY} from "@/api/brickverse";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import {useQuery} from "@apollo/client";

const Banner = () => {
  const {data, error, loading} = useQuery(GET_POSTS_QUERY)
  if (error) {
    return <ErrorDisplay error={error}>发生了错误！</ErrorDisplay>
  }
  if (loading) {
    return "正在加载中……"
  }

  return <View>{data.posts.meta.pagination.total}</View>
}

export default Banner;
