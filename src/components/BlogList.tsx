import {View} from "@tarojs/components";
import {AtAvatar, AtCard, AtDivider, AtLoadMore} from "taro-ui";
import {fallbackThumbnail} from "@/common/constants";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {ErrorDisplay} from "@/components/ErrorDisplay";

export const YUQUE_BLOG = gql`
        query PaginatedYuQue($skip: Float!, $take: Float!) {
          paginatedYuque(skip: $skip, take: $take) {
            id
            title
            description
            word_count
            created_at
            cover
            slug
          }
        }
  `

export const BlogList = () => {
  const [blogs, setBlogs] = useState<any>([])
  const [skip, setSkip] = useState(0)
  const [take] = useState(5)
  const {loading, error, data, refetch} = useQuery(YUQUE_BLOG, {variables: {skip: 0, take: 5}})
  const [status, setStatus]: ['more' | 'loading' | 'noMore' | undefined, Function] = useState('loading')

  const handleClick = () => {
    setSkip(skip + take)
    setStatus('loading')
    refetch({skip: skip + take, take}).then()
  }

  useEffect(() => {
    if (data) {
      setStatus('more')

      setBlogs(blogs.concat(data.paginatedYuque))
    }
  }, [blogs, data])

  if (error) {
    console.error(error)
    return <View>
      <ErrorDisplay error={error}>
        <button onClick={() => refetch()}>重试</button>
      </ErrorDisplay>
    </View>
  }

  return <View>
    {blogs.map(article => <View key={article.id}>
      <AtCard title={article.title}
        extra={`${article.word_count} 字`}
        note={article.created_at}
        thumb={article.cover ? `https://uniheart.pa-ca.me/proxy?url=${article.cover}` : fallbackThumbnail}
        onClick={() => Taro.navigateTo({
                url: `/pages/yuque/article?slug=${article.slug}`,
              })}
      ><AtAvatar
        image={article.cover ? `https://uniheart.pa-ca.me/proxy?url=${article.cover}` : fallbackThumbnail}
        size='large'
      />
        {article.description}</AtCard><AtDivider lineColor='#fff' />
    </View>)}
    <AtLoadMore loadingText='加载中……' onClick={handleClick.bind(this)} status={loading ? 'loading' : status} />
  </View>
}
