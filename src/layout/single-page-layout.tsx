import {View} from "@tarojs/components";
import {HighLevel} from "@/layout/high-level";
import Taro, {usePullDownRefresh} from "@tarojs/taro";

const SinglePageLayout = ({children, bgColor = 'cornflowerblue', padding = '10px'}) => {
  usePullDownRefresh(() => {
    console.log('用户下拉刷新');
    Taro.stopPullDownRefresh()
  })

  return <View style={{backgroundColor: bgColor, height: '100%'}}>
    <HighLevel />
    <View style={{padding: padding}}>{children}</View>
  </View>
}

export default SinglePageLayout
