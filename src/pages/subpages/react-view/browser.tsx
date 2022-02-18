import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import {AtButton, AtInput, AtTextarea} from "taro-ui";
import {useState} from "react";
import {Interpreter} from "eval5";

const Browser = () => {
  const [url, setUrl] = useState('https://www.baidu.com');
  const [code, setCode] = useState('')
  const [printed, setPrinted] = useState('')
  const [showHtml, setShowHtml] = useState(true)

  const output: string[] = []
  const interpreter = new Interpreter({
    ...window,
    Module: {
      print: function (text: string) {
        output.push(text)

        setPrinted(output.join('\n'))
      }
    },
    window: {
      prompt: () => {
        console.error('不支持')
      }
    }
  }, {
    timeout: 5000, rootContext: {}
  });

  const loadUrl = async () => {
    const {data} = await Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(url)}`});
    setCode(data)

    if (url.endsWith('.js')) {
      setShowHtml(false)
      interpreter.evaluate(data)
    } else {
      setShowHtml(true)
    }
  }

  return <View>
    <AtInput
      name='value'
      title='url'
      type='text'
      placeholder='url'
      value={url}
      onChange={v => setUrl(String(v))}
    />
    <AtButton onClick={loadUrl}>加载</AtButton>
    <AtTextarea value={code} onChange={(input) => setCode(input)} count={false} focus className='code large'
      maxLength={Infinity}
    />
    {showHtml && <View id='root' dangerouslySetInnerHTML={{__html: code}} />}
    {!showHtml && <AtTextarea className='terminal' disabled onChange={() => {
    }} value={printed} count={false}
    />}
  </View>;
}

export default Browser
