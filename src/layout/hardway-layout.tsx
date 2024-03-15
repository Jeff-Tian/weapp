import {OfficialAccount, View} from "@tarojs/components"
import {HighLevel} from "@/layout/components/high-level";
import {Fab} from "@/components/HomePageExtra/HomePageExtra";
import Taro, {ENV_TYPE, usePullDownRefresh} from "@tarojs/taro";
import './fab.styl';
import '../components/rich-modal.styl'


const HardwayLayout = ({children}) => {

  usePullDownRefresh(() => {
    console.log('用户下拉刷新');
    Taro.stopPullDownRefresh()
  })

  return <View>
    <HighLevel />
    <View style={{minHeight: '1000px'}}>
      {Taro.getEnv() === ENV_TYPE.WEAPP && <OfficialAccount />}
      {children}
    </View>
    <Fab />
  </View>
}

export default HardwayLayout
