import {View} from "@tarojs/components"
import {remark} from 'remark'
import remarkHtml from "remark-html"
import {useEffect, useState} from "react"

const Test = () => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    remark().use(remarkHtml).process('## Hello World!').then(f => {
      console.log('f = ', String(f))
      setHtml(String(f))
    })
  })


  return <View>
    Test
    <View dangerouslySetInnerHTML={{__html: `<h1>Hello</h1>`}}/>
    <View dangerouslySetInnerHTML={{__html: html}}/>
  </View>
}

export default Test
