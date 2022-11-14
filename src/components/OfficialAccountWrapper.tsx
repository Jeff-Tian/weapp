import {Image} from "@tarojs/components";
import {AtCard} from "taro-ui";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import LinkedImage from "@/components/LinkedImage";

const H5OfficialAccountImage = () => <a href='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' target='_blank'><Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/></a>

const WeappOfficialAccountImage = () => <Image
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='widthFix'
/>
export const MiniprogramCard = () => <AtCard note='' extra='欢迎添加' title='哈德韦小程序' thumb='https://avatars.githubusercontent.com/u/3367820?v=4'>
  <LinkedImage src='https://i.lensdump.com/i/Rg0cVA.md.png'
    mode='aspectFit'
    href='https://i.lensdump.com/i/Rg0cVA.md.png'
  />
</AtCard>

export const OfficialAccountCard = () => <AtCard note='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA' extra='欢迎关注'
  title='哈德韦公众号'
  thumb='https://avatars.githubusercontent.com/u/3367820?v=4'
><LinkedImage
  src='https://i1.lensdump.com/i/RgI2D1.png'
  mode='aspectFit'
  href='https://mp.weixin.qq.com/s/sctQJX4eAwSa0a5qcmPLIA'
/></AtCard>

const OfficialAccountWrapper = () => Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappOfficialAccountImage /> :
  <H5OfficialAccountImage />

export default OfficialAccountWrapper
