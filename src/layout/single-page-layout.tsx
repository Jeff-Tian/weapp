import {View} from "@tarojs/components";
import {HighLevel} from "@/layout/high-level";
import Taro, {usePullDownRefresh} from "@tarojs/taro";

const SinglePageLayout = ({children, bgColor = 'cornflowerblue', padding = '10px'}) => {
  usePullDownRefresh(() => {
    console.log('用户下拉刷新');
    Taro.stopPullDownRefresh()
  })

  return <View style={{backgroundColor: bgColor, height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <HighLevel />
    <View style={{
      padding: padding,
      flex: 1,
    }}
    >{children}</View>
  </View>
}

export default SinglePageLayout
