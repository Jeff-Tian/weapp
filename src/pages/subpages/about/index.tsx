import {View} from "@tarojs/components"
import Taro, {ENV_TYPE} from "@tarojs/taro";
import SinglePageLayout from "@/layout/single-page-layout";
import {MiniprogramCard, OfficialAccountCard} from "@/components/OfficialAccountWrapper";
import packageJson from '../../../../package.json'
import SystemInfo from "./system.info";
import Link from "@/components/Link";
import {AtForm} from "taro-ui";

const About = () => {
  return <SinglePageLayout>
    <View className='at-article'>
      <View className='at-article__h1'>哈德韦小程序</View>
      <View className='at-article__info'>
        package.json 版本： {packageJson.version}
        <br />
        {Taro.getEnv() === ENV_TYPE.WEAPP &&
          <View>微信小程序版本： {Taro.getAccountInfoSync().miniProgram?.version}</View>}
      </View>

      <View className='at-article__content'>
        <View className='at-article__section'>
          <View>
            源代码： {Taro.getEnv() === ENV_TYPE.WEB ?
            <a href='https://github.com/jeff-tian/weapp' target='_blank'>https://github.com/jeff-tian/weapp</a> :
            <View>https://github.com/jeff-tian/weapp</View>}
          </View>
        </View>
        <View className='at-article__section'>
          <View>域名列表：</View>
          <AtForm>
            <View className='at-article__p'>
              Cloudflare CDN： <Link src='https://taro.pa-ca.me' />
            </View>
            <View className='at-article__p'>
              Vercel: <Link src='https://taro.jefftian.dev' />
            </View>
          </AtForm>
        </View>
        <View className='at-article__section'>
          <MiniprogramCard />
        </View>
        <View className='at-article__section'>
          <OfficialAccountCard />
        </View>
        <View className='at-article__section'>
          <SystemInfo />
        </View>
      </View>
    </View>
  </SinglePageLayout>
}

export default About
