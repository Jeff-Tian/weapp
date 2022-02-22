import Taro from '@tarojs/taro'
import {RichText, View} from "@tarojs/components"

import remark from 'remark'
import remarkHtml from "remark-html"
import {useEffect, useState} from "react";

const PearlsPlus = () => {
  const [htmlString, setHtmlString] = useState('')

  useEffect(()=>{
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(`https://raw.githubusercontent.com/Jeff-Tian/PearlsPlus/main/chapter1/1.6.md`)}`}).then(res=>{
      const {data} = res
      const processor = remark().use(remarkHtml)
      const html = processor.process(data).toString()
      console.log('html = ', html)
      setHtmlString(html)
      // const root = document.getElementById('root')
      // if(root) root.innerHTML = html
    })
  }, [])

  return <RichText id='root' nodes={htmlString}>Hello</RichText>
}

export default PearlsPlus
