import {gql, useQuery} from "@apollo/client"
import { View } from "@tarojs/components"
import {AtActivityIndicator, AtAvatar, AtCard, AtDivider} from "taro-ui"
import Taro from "@tarojs/taro"
import './article.styl'
import HardwayLayout from "../layout/hardway-layout"

const YUQUE_BLOG = gql`
        query {
          allYuque {
            id
            title
            description
            word_count
            created_at
            cover
          }
        }
  `

const YuQue: React.FC = () => {
  const {loading, error: _error, data} = useQuery(YUQUE_BLOG)

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.allYuque.map(article => <View><AtCard title={article.title} extra={`${article.word_count} 字`}
      note={article.created_at} thumb={`https://uniheart.pa-ca.me/proxy?url=${article.cover}`} onClick={()=>Taro.navigateTo({
      url: `/pages/yuque/article?id=${article.id}`,
    })}
    ><AtAvatar image={`https://uniheart.pa-ca.me/proxy?url=${article.cover}`} size='large' />
      {article.description}</AtCard><AtDivider lineColor='#fff' />
    </View>)}
  </HardwayLayout>
}

export default YuQue
