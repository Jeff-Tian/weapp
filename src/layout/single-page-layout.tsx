import {View} from "@tarojs/components";
import {HighLevel} from "@/layout/high-level";
import Taro, {usePullDownRefresh} from "@tarojs/taro";
import {authingAppId} from "@/common/constants";
import {GuardProvider} from "@authing/guard-react";
import "@authing/guard-react/dist/esm/guard.min.css";

const SinglePageLayout = ({children}) => {
  usePullDownRefresh(() => {
    console.log('用户下拉刷新');
    Taro.stopPullDownRefresh()
  })

  return <View style={{backgroundColor: 'cornflowerblue'}}>
    <GuardProvider
      appId={authingAppId}
      mode='modal'
    >
      <HighLevel />
      <View style={{padding: '10px'}}>{children}</View>
    </GuardProvider>
  </View>
}

export default SinglePageLayout
