import {gql, useQuery} from "@apollo/client"
import { View, Image } from "@tarojs/components"
import {AtActivityIndicator} from "taro-ui"
import HardwayLayout from "../layout/hardway-layout"

const YUQUE_BLOG = gql`
        query {
          yuque (id: "53296538") {
            id
            title
            description
            word_count
            created_at
            cover
            body
          }
        }
  `

const YuQueArticle: React.FC = () => {
  const {loading, error, data} = useQuery(YUQUE_BLOG)

  console.log(loading, error, data)

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.yuque && <View className='at-article'>
      <View className='at-article__h1'>
        {data.yuque.title}
      </View>
      <View className='at-article__info'>
        {data.yuque.created_at}&nbsp;&nbsp;&nbsp;{data.yuque.word_count} 字
      </View>

      <Image
        className='at-article__img'
        src={data.yuque.cover}
        mode='widthFix'
      />

      <View className='at-article__content'>
        {data.yuque.body}
      </View>

    </View>}
  </HardwayLayout>
}

export default YuQueArticle
