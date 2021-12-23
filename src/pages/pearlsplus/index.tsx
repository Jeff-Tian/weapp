import {View} from "@tarojs/components"
import {Interpreter} from "eval5";
import {useEffect} from "react";
import Taro from '@tarojs/taro'
import HardwayLayout from "../layout/hardway-layout";

const interpreter = new Interpreter(window, {
  timeout: 1000,
});

const PearlsPlus = () => {
  useEffect(() => {
    Taro.request({
      url: 'https://pearlsplus.pa-ca.me/test.js?abc=def',
      responseType: 'text',
      dataType: 'text/plain',
      header: {'Content-Type': 'text/plain'}
    }).then(data => {
      console.log('data = ', data)
      const code = data.data;

      interpreter.evaluate(`
        var WebAssembly = {};

        ${code}
  `)
    })
  }, [])


  return <HardwayLayout><View>
    以下是动态渲染的内容：
    {/*{res}*/}
  </View></HardwayLayout>
}

export default PearlsPlus
