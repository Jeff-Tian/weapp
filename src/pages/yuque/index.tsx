import {gql, useQuery} from "@apollo/client"
import { View } from "@tarojs/components"
import {AtActivityIndicator, AtCard, AtDivider} from "taro-ui"
import HardwayLayout from "../layout/hardway-layout"

const YUQUE_BLOG = gql`
        query {
          allYuque {
            nodes {
              id
              title
              description
              word_count
              created_at
              cover
            }
          }
        }
  `

const YuQue: React.FC = () => {
  const {loading, error, data} = useQuery(YUQUE_BLOG)

  console.log(loading, error, data)

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.allYuque.nodes.map(article => <View><AtCard title={article.title} extra={`${article.word_count} 字`}
      note={article.created_at} thumb={article.cover}
    >{article.description}</AtCard><AtDivider lineColor='#fff' />
    </View>)}
  </HardwayLayout>
}

export default YuQue
