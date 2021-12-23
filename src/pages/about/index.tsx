import {View} from "@tarojs/components"
import { Interpreter } from "eval5";
import Taro from '@tarojs/taro'
import {useEffect, useState } from "react";

import HardwayLayout from "../layout/hardway-layout"

import packageJson from '../../../package.json'
import SystemInfo from "./system.info";

const interpreter = new Interpreter(window, {
  timeout: 1000,
});
const res = interpreter.evaluate(`1+1`)

console.log('res = ', res)
const About = () => {
  const [code, setCode] = useState('')
  useEffect(()=>{
    Taro.request({url:'https://pearlsplus.pa-ca.me/test.js?abc=def', responseType: 'text',dataType: 'text/plain', header: {'Content-Type': 'text/plain'}}).then(data=>{
      console.log('data = ', data)
      setCode(data.data)
      console.log(code)

      const res2 = interpreter.evaluate(`var WebAssembly = {}; ${data.data}`)
      console.log('res2 = ', res2)
    })
  }, [])
  return <HardwayLayout><View>package.json 版本： {packageJson.version}</View><SystemInfo /></HardwayLayout>;
}

export default About
