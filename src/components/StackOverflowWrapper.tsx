import {Image} from "@tarojs/components";
import Taro, {ENV_TYPE} from "@tarojs/taro";

const WeappStackOverflowImage = () => <Image
  className='at-article__img'
  src='https://stackoverflow-readme-profile.johannchopin.fr/profile/769900?theme=dark&website=true&location=true'
  mode='scaleToFill'
/>

const H5StackOverflowImage = () => <a href='https://stackoverflow.com/users/769900/jeff-tian'
  target='_blank'
><WeappStackOverflowImage /></a>

const StackOverflowWrapper = () => Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappStackOverflowImage /> : <H5StackOverflowImage />

export default StackOverflowWrapper
