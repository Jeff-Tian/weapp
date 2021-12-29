import { View } from "@tarojs/components"
import { Interpreter } from "eval5";
import TaroDOM from '@tarojs/react'
import ReactDOM from 'react-dom'
import React, { useEffect, useState } from "react";
import Taro, { ENV_TYPE } from "@tarojs/taro";
import { AtActivityIndicator } from "taro-ui";
import './tictactoe.styl'
import HardwayLayout from "../layout/hardway-layout";

// import divviewer from "../../adapters/divviewer";

const interpreter = new Interpreter(window, {
  timeout: 5000,
});

window['ReactDOM'] = ENV_TYPE.WEB === Taro.getEnv() ? ReactDOM : TaroDOM;
window['React'] = React;

const renderReactDOM = (dynamicContentRendering: string) => {
  const newLocal = dynamicContentRendering;
  console.log('new = ', newLocal);
  interpreter.evaluate(newLocal)
};

const sanitizeAndRender = (x) => {
  renderReactDOM(x);
};

const buildBabel = (res: Taro.request.SuccessCallbackResult) => {
  const babel = res.data.replace(/const /g, 'var ').replace(/let /g, 'var ');
  global['Babel'] = interpreter.evaluate(`${babel}; window.Babel`)
};

const sleep = second => new Promise(resolve => setTimeout(resolve, second * 1000))

const TicTacToe = () => {
  const fetchJsAsPlainText = (url: string) => {
    setUrls([...urls, url])
    setLoadingText('加载脚本中……')

    return Taro.request({
      url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(url)}`,
      responseType: 'text',
      dataType: 'text/plain'
    }).then(x => {
      const index = urls.indexOf(url)

      setUrls([...urls.slice(0, index), ...urls.slice(index + 1)])

      return x
    });
  }

  const fetchTicTacToe = async () => {
    const { data } = await Taro.request({
      url: 'https://sls.pa-ca.me/nest/graphql',
      method: 'POST',
      data: {
        query: `query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/Game.tsx", extra: "ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`
      }
    })

    console.log('data = ', data);
    return data.data.transform.text;
  }

  useEffect(() => {
    Promise.all([fetchTicTacToe()]).then(([tictactoe]) => {
      console.log('tic = ', tictactoe);
      setUrls([])
      setLoadingText('脚本加载完成，构建 Babel 中……')

      // buildBabel(babel)

      setLoadingText('Babel 构建完成，渲染中……')
      sleep(1).then(() => {
        sanitizeAndRender(tictactoe);
        setLoadingText('渲染完成。')

        sleep(1).then(() => {
          setLoading(false)
        })
      }
      )
    })
  }, [])

  const [loading, setLoading] = useState(true)
  const [urls, setUrls] = useState<string[]>([])
  const [loadingText, setLoadingText] = useState('加载脚本中……')

  return <HardwayLayout><View>
    以下是动态渲染的内容：
    <View id='react-dom-view'>
      <AtActivityIndicator mode='normal' size={50} content={`加载 ${urls.join('\n')} 中……`} isOpened={urls.length > 0} />
      <AtActivityIndicator mode='center' size={128} content={loadingText}
        isOpened={loading}
      />
    </View>
    <View id='root'>
    </View>
  </View></HardwayLayout>
}

export default TicTacToe
