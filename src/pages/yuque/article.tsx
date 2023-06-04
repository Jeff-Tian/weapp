import {gql, useMutation, useQuery} from "@apollo/client"
import {Button, Image, View} from "@tarojs/components"
import {AtActivityIndicator, AtButton} from "taro-ui"
import Taro from "@tarojs/taro"
import remark from 'remark'
import remarkHtml from "remark-html"
import React, {useState} from "react"
import * as assert from 'assert';
import {SYNC_YUQUE_TO_ZHIHU, draftDirectly} from "@/services/zhihu";
import WebMarkdownViewer from "@/components/markdown-viewer/h5";
import HardwayLayout from "../../layout/hardway-layout"
import './article.styl'

const YuQueArticle: React.FC = () => {
  const authingUser = Taro.getStorageSync("_authing_user")
  const params = Taro.getCurrentInstance()?.router?.params

  assert.ok(params, "本页必须传递参数！")

  const {id, slug} = params

  const YUQUE_BLOG = id ? gql`
    query {
      yuque (id: "${id}") {
        id
        title
        description
        word_count
        created_at
        cover
        body
        body_html
      }
    }
  ` : gql`
    query {
      yuque (slug: "${slug}") {
        id
        title
        description
        word_count
        created_at
        cover
        body
        body_html
      }
    }
  `

  const {loading, error, data} = useQuery(YUQUE_BLOG)
  const [html, setHtml] = useState('')

  if (error) {
    console.error(error)

    Taro.showToast({
      title: error.message,
      icon: 'none',
      duration: 3000
    })
  }

  if (data && data.yuque && !html) {
    Taro.setNavigationBarTitle({
      title: `${data.yuque.title}`
    }).then()

    if (!data.yuque.body_html) {
      const remarked = remark();
      const used = remarked.use(remarkHtml);
      const processed = used.process(data.yuque.body);

      setHtml(String(processed))
    } else {
      setHtml(data.yuque.body_html)
    }
  }

  const [syncYuqueToZhihu, {error: _syncError, data: _syncResult}] = useMutation(SYNC_YUQUE_TO_ZHIHU, {
    variables: {
      "syncYuqueToZhihuSlug2": slug
    }
  })

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
      <View className='at-row'>
        <View className='at-col'>
          <AtButton size='small'
            onClick={() => Taro.setClipboardData({data: data.yuque.body})}
          >拷贝正文（markdown）</AtButton>
        </View>
        <View className='at-col'>
          <AtButton size='small' onClick={() => Taro.setClipboardData({data: html})}>拷贝正文（富文本）</AtButton>
        </View>
      </View>
      <View className='at-article__info'>
        {data.yuque.created_at}&nbsp;&nbsp;&nbsp;{data.yuque.word_count} 字
      </View>

      {authingUser &&
        <Button type='primary'
          onClick={() => slug ? syncYuqueToZhihu() : draftDirectly(data.yuque.title, html)}
        >发布到知乎</Button>
      }

      <View className='at-article__content taro_html'>
        <View className='at-article__section'>
          {
            Taro.getEnv() === Taro.ENV_TYPE.WEB ? <WebMarkdownViewer markdown={data.yuque.body} /> :
              <View dangerouslySetInnerHTML={{__html: html}} />
          }
        </View>
      </View>

    </View>}
  </HardwayLayout>
}

export default YuQueArticle
