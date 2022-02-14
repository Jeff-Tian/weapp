import {gql, useQuery} from "@apollo/client"
import {View} from "@tarojs/components"
import {AtActivityIndicator, AtAvatar, AtCard, AtDivider, AtLoadMore} from "taro-ui"
import Taro from "@tarojs/taro"
import React, {useEffect, useState} from "react";
import './article.styl'
import HardwayLayout from "../layout/hardway-layout"


const YUQUE_BLOG = gql`
        query {
          paginatedYuque {
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

const YuQue: React.FC = () => {
  const {loading, error, data} = useQuery(YUQUE_BLOG)
  const [status, setStatus]: ['more' | 'loading' | 'noMore' | undefined, Function] = useState('more')

  const handleClick = (...args: any[]) => {
    console.log(args)
    setStatus('loading')
  }

  useEffect(() => {
    if (error) {
      Taro.navigateTo({url: `/pages/yuque/article?slug=ytwbzm`}).then()
    }
  }, [error])

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.paginatedYuque.map(article => <View key={article.id}><AtCard title={article.title}
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
  </HardwayLayout>
}

export default YuQue
