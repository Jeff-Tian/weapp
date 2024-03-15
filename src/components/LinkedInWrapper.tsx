import Wrapper from "@/common/wrapper";
import {Image} from "@tarojs/components";

const WeappLinkedInImage = () => <Image className='at-article__img' mode='scaleToFill'
  src='https://go.inversify.cn/api/dynamicimage?url=https://resume.jijiyy.me/zh-CN/jeff-tian/linked-in&width=332&height=242'
/>
const H5LinkedInImage = () => <iframe src='https://resume.jijiyy.me/linkedin/jeff~tian.html'
  style={{border: 'none', width: '100%', height: '315px'}}
></iframe>

const LinkedInWrapper = Wrapper(WeappLinkedInImage, H5LinkedInImage)

export default LinkedInWrapper;
