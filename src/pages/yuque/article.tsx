import {gql, useQuery} from "@apollo/client"
import {View, Image} from "@tarojs/components"
import {AtActivityIndicator} from "taro-ui"
import MarkdownIt from 'markdown-it'
import Taro from "@tarojs/taro"

import '@tarojs/taro/html.css'

import HardwayLayout from "../layout/hardway-layout"


const YuQueArticle: React.FC = () => {
  const md = new MarkdownIt()

  const YUQUE_BLOG = gql`
        query {
          yuque (id: "${Taro.getCurrentInstance()?.router?.params.id}") {
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

  const {loading, error, data} = useQuery(YUQUE_BLOG)

  console.log(loading, error, data)

  if (data && data.yuque) {
    Taro.setNavigationBarTitle({
      title: `${data.yuque.title}`
    })
  }

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
    isOpened={loading}
  />
    {data && data.yuque && <View className='at-article'>
      <Image
        className='at-article__img'
        src={data.yuque.cover}
        mode='widthFix'
      />

      <View className='at-article__h1'>
        {data.yuque.title}
      </View>
      <View className='at-article__info'>
        {data.yuque.created_at}&nbsp;&nbsp;&nbsp;{data.yuque.word_count} 字
      </View>

      <View className='at-article__content taro_html'>
        <View dangerouslySetInnerHTML={{__html: md.render(data.yuque.body)}} />
      </View>

    </View>}
  </HardwayLayout>
}

export default YuQueArticle
