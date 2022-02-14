import {View} from "@tarojs/components";
import * as util from "util";

export const ErrorDisplay = ({error, children}) => <View className='at-article'>
  <View className='at-article__h1'>发生了错误</View>
  <View className='at-article__p'>{util.inspect(error)}</View>
  <View>{children}</View>
</View>
