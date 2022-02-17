import Taro from '@tarojs/taro'
import {View} from "@tarojs/components"
import {AtButton, AtTextarea} from "taro-ui";
import {useEffect, useState} from "react";
import {Interpreter} from "eval5";
import HardwayLayout from "../../layout/hardway-layout";
import './wasm.styl'

const Prompt = ({isOpen, onConfirm}) => {
  const [content, setContent] = useState('')

  return isOpen ? <View className='prompt'>
    <View>请输入要排序的数字集合，一行一个。</View>
    <View>
      <AtTextarea value={content} onChange={(inputs) => {
        setContent(inputs)
      }} focus className='inputs' count={false} autoFocus
      />
    </View>
    <View>
      <AtButton full={false} onClick={() => onConfirm(content)}>确定</AtButton>
    </View>
  </View> : null
}

const PearlsPlus = () => {
  const [code, setCode] = useState('加载中……')
  const [status, setStatus] = useState('正在加载运行时……')
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [printed, setPrinted] = useState('')
  let userInput = []
  const output: string[] = []
  const [sourceCode, setSourceCode] = useState('')

  let count = 0;
  const interpreter = new Interpreter({
    ...window,
    Module: {
      print: function (text) {
        console.log('eval = ', text);
        output.push(text)

        setPrinted(output.join('\n'))
      }
    },
    window: {
      prompt: () => {
        return userInput[count++] || null
      }
    }
  }, {
    timeout: 5000, rootContext: {}
  });


  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://raw.githubusercontent.com/Jeff-Tian/PearlsPlus/main/chapter1/1.6.1.cpp')}`}).then(({data}) => {
      setCode(data)
    }).catch(err => setCode(JSON.stringify(err)))
  }, [])

  useEffect(() => {
    Taro.request({url: `https://uniheart.pa-ca.me/proxy?a=c&url=${encodeURIComponent('https://pearlsplus.pa-ca.me/chapter1/wmp-1.6.1.js')}`}).then(({data}) => {
      setStatus('运行时下载完成。')
      setSourceCode(data)
      setStatus('运行时加载完毕。')
    }).catch(err => setStatus(JSON.stringify(err)))
  }, [])

  return <HardwayLayout><View>
    <View>1.6 习题</View>
    <View>1. 如果不缺内存，如何使用一个具有库的语言来实现一种排序算法以表示和排序集合？</View>
    <View>C++ 源代码：</View>
    <AtTextarea className='code' onChange={() => {
    }} value={code} maxLength={Infinity} count={false} disabled
    />

    <Prompt isOpen={isModalOpen} onConfirm={content => {
      userInput = content.trim().split('\n').filter(s => !!s.trim()).map(i => Number(i));
      setIsModalOpen(false)

      setStatus('用户输入完毕，准备执行……')

      output.push('用户输入： ')
      output.push(userInput.join('\n'))
      setPrinted(output.join('\n'))

      setTimeout(() => {
        interpreter.evaluate(sourceCode)
      }, 10)
    }}
    />
    <View>执行结果：</View>
    <AtTextarea className='terminal' disabled placeholder={status} onChange={() => {
    }} value={printed} count={false}
    />
  </View></HardwayLayout>
}

export default PearlsPlus
