import {gql, useQuery} from "@apollo/client"
import {View, Image, Button} from "@tarojs/components"
import {AtActivityIndicator} from "taro-ui"
import Taro from "@tarojs/taro"
import '@tarojs/taro/html.css'

import remark from 'remark'
import remarkHtml from "remark-html"
import {useState} from "react"

import './article.styl'

import HardwayLayout from "../layout/hardway-layout"
import {publish} from "../../services/zhihu";


const YuQueArticle: React.FC = () => {
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
  const [html, setHtml] = useState('')

  console.log(loading, error, data)

  if (data && data.yuque) {
    Taro.setNavigationBarTitle({
      title: `${data.yuque.title}`
    }).then()

    const remarked = remark();
    const used = remarked.use(remarkHtml);
    const processed = used.process(data.yuque.body);
    processed.then(f => {
      setHtml(String(f))
    }).catch(ex => {
      console.error(ex);
      setHtml(String('hello, errored'))
    })
  }

  const publishToZhihu = () => {
    publish()
  }

  return <HardwayLayout><AtActivityIndicator mode='center' size={128} content='加载中……'
                                             isOpened={loading}
  />
    {data && data.yuque && <View className='at-article'>
      {data.yuque.cover && <Image
        className='at-article__img'
        src={`https://uniheart.pa-ca.me/proxy?url=${data.yuque.cover}`}
        mode='widthFix'
      />
      }

      <View className='at-article__h1'>
        {data.yuque.title}
      </View>
      <View className='at-article__info'>
        {data.yuque.created_at}&nbsp;&nbsp;&nbsp;{data.yuque.word_count} 字
      </View>

      <Button onClick={publishToZhihu}>发布到知乎</Button>

      <View className='at-article__content taro_html'>
        <View dangerouslySetInnerHTML={{__html: html}}/>
      </View>

    </View>}
  </HardwayLayout>
}

export default YuQueArticle
