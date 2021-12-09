import {gql, useQuery} from "@apollo/client"
import {View} from "@tarojs/components"
import {AtActivityIndicator, AtAvatar, AtCard, AtDivider} from "taro-ui"
import Taro from "@tarojs/taro"
import './article.styl'
import HardwayLayout from "../layout/hardway-layout"
import {useEffect} from "react";

const YUQUE_BLOG = gql`
        query {
          allYuque {
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

  useEffect(() => {
    if (error) {
      Taro.navigateTo({url: `/pages/yuque/article?slug=ytwbzm`}).then()
    }
  }, [error])

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.allYuque.map(article => <View key={article.id}><AtCard title={article.title}
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
  </HardwayLayout>
}

export default YuQue
