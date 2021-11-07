import { gql, useQuery } from "@apollo/client"
import { View, Image, Button } from "@tarojs/components"
import { AtActivityIndicator } from "taro-ui"
import Taro from "@tarojs/taro"
import '@tarojs/taro/html.css'

import remark from 'remark'
import remarkHtml from "remark-html"
import { useState } from "react"

import './article.styl'

import HardwayLayout from "../layout/hardway-layout"
import { publish, loginAndPublish } from "../../services/zhihu";


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

  const { loading, error, data } = useQuery(YUQUE_BLOG)
  const [html, setHtml] = useState('')

  console.log(loading, error, data)

  if (data && data.yuque && !html) {
    Taro.setNavigationBarTitle({
      title: `${data.yuque.title}`
    }).then()

    console.log('remark = ', remark);
    const remarked = remark();
    console.log('remarked = ', remarked);
    const used = remarked.use(remarkHtml);
    console.log('used = ', used);
    const processed = used.process(data.yuque.body);
    console.log('processed = ', processed);

    setHtml(String(processed))
  }

  const publishToZhihu = (title, content) => {
    publish(title, content)
  }

  const loginAndPublishToZhihu = (title, content) => {
    loginAndPublish(title, content)
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

      <Button onClick={() => loginAndPublishToZhihu(data.yuque.title, html)}>登录并发布到知乎</Button>
      <Button onClick={() => publishToZhihu(data.yuque.title, html)}>直接发布到知乎</Button>

      <View className='at-article__content taro_html'>
        <View dangerouslySetInnerHTML={{ __html: html }} />
      </View>

    </View>}
  </HardwayLayout>
}

export default YuQueArticle
