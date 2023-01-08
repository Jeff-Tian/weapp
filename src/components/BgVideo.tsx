import {gql, useMutation, useQuery} from "@apollo/client";
import MyVideo from "@/components/MyVideo";
import {SwiperItem} from "@tarojs/components";

const BgVideo = () => {
  const VIDEO_QUERY = gql`query GetVideo {
    video
  }`

  const VIDEO_MUTATION = gql`mutation SetVideoCache {
    setVideoSrcCache
  }`

  const {loading, error, data} = useQuery(VIDEO_QUERY)

  useMutation(VIDEO_MUTATION)

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error)
    return null;
  }

  if (!data || !data.video) {
    return null;
  }

  return <SwiperItem><MyVideo src={data.video} /></SwiperItem>
}


export default BgVideo;
