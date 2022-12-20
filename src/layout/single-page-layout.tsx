import {View} from "@tarojs/components";
import {HighLevel} from "@/layout/high-level";
import Taro, { usePullDownRefresh } from "@tarojs/taro";

const SinglePageLayout = ({children}) => {
  usePullDownRefresh(() => {
    console.log('用户下拉刷新');
    Taro.stopPullDownRefresh()
  })

  return <View style={{backgroundColor: 'cornflowerblue'}}>
    <HighLevel />
    <View style={{padding: '10px'}}>{children}</View>
  </View>
}

export default SinglePageLayout
