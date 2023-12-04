import {View} from "@tarojs/components";
import Taro, {usePullDownRefresh} from "@tarojs/taro";
import {SimpleFrame} from "@/layout/components/simple-frame";

const SimpleLayout = ({children, bgColor = 'cornflowerblue', padding = '10px', height = '100vh'}) => {
  usePullDownRefresh(() => {
    Taro.stopPullDownRefresh()
  })

  return <View style={{backgroundColor: bgColor, height, display: 'flex', flexDirection: 'column'}}>
    <SimpleFrame />
    <View style={{
      padding: padding,
      flex: 1,
    }}
    >{children}</View>
  </View>
}

export default SimpleLayout
