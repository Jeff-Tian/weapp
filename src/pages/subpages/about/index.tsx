import {View} from "@tarojs/components"
import Taro, {ENV_TYPE} from "@tarojs/taro";
import SinglePageLayout from "@/layout/single-page-layout";

import packageJson from '../../../../package.json'
import SystemInfo from "./system.info";


const About = () => {
  return <SinglePageLayout>
    <View className='at-article'>
      <View className='at-article__h1'>哈德韦小程序</View>
      <View className='at-article__info'>
        package.json 版本： {packageJson.version}
        <br />
        {Taro.getEnv() === ENV_TYPE.WEAPP && <View>微信小程序版本： {Taro.getAccountInfoSync().miniProgram?.version}</View>}
      </View>

      <View className='at-article__content'>
        <View className='at-article__section'>
          <View>
            源代码： <a href='https://github.com/jeff-tian/weapp' target='_blank'>https://github.com/jeff-tian/weapp</a>
          </View>
        </View>
        <View className='at-article__section'>
          <SystemInfo />
        </View>
      </View>
    </View>
  </SinglePageLayout>
}

export default About
