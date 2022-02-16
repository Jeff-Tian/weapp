import {gql, useQuery} from "@apollo/client"
import {View} from "@tarojs/components"
import {AtActivityIndicator, AtAvatar, AtCard, AtDivider, AtLoadMore} from "taro-ui"
import Taro from "@tarojs/taro"
import React, {useEffect, useState} from "react";
import {ErrorDisplay} from "@/components/ErrorDisplay";
import './article.styl'
import HardwayLayout from "../../layout/hardway-layout"


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

export const YuQueInner = () => {
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
  }, [data])

  if (error) {
    return <ErrorDisplay error={error}>
      <button onClick={() => refetch()}>重试</button>
    </ErrorDisplay>
  }


  return <View><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {blogs.map(article => <View key={article.id}><AtCard title={article.title}
      extra={`${article.word_count} 字`}
      note={article.created_at}
      thumb={article.cover ? `https://uniheart.pa-ca.me/proxy?url=${article.cover}` : 'https://jeff-tian.jiwai.win/icons-2480a96bd1efbed5e33c00a38018fc28/favicon.ico'}
      onClick={() => Taro.navigateTo({
                                                           url: `/pages/yuque/article?slug=${article.slug}`,
                                                         })}
    ><AtAvatar
      image={article.cover ? `https://uniheart.pa-ca.me/proxy?url=${article.cover}` : 'https://jeff-tian.jiwai.win/icons-2480a96bd1efbed5e33c00a38018fc28/favicon.ico'}
      size='large'
    />
      {article.description}</AtCard><AtDivider lineColor='#fff' />
    </View>)}
    <AtLoadMore onClick={handleClick.bind(this)} status={status} />
  </View>
}

const YuQue: React.FC = () => <HardwayLayout><YuQueInner /></HardwayLayout>

export default YuQue
