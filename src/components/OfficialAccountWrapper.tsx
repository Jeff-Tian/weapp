import {Image} from "@tarojs/components";
import {AtCard} from "taro-ui";
import Taro, {ENV_TYPE} from "@tarojs/taro";

const H5OfficialAccountImage = () => <a href='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' target='_blank'><Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/></a>

const WeappOfficialAccountImage = () => <Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/>

export const H5OfficialAccountCard = () => <AtCard note='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' extra='欢迎关注'
  title='哈德韦公众号'
  thumb='https://avatars.githubusercontent.com/u/3367820?v=4'
><a href='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' target='_blank'><Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/></a></AtCard>

const WeappOfficialAccountCard = () => <AtCard note='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' extra='欢迎关注'
  title='哈德韦公众号'
  thumb='https://avatars.githubusercontent.com/u/3367820?v=4'
><Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/></AtCard>

export const OfficialAccountCard = () => Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappOfficialAccountCard />:<H5OfficialAccountCard />

const OfficialAccountWrapper = () => Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappOfficialAccountImage /> :
  <H5OfficialAccountImage />

export default OfficialAccountWrapper
