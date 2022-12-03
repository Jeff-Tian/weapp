import {OfficialAccount, View} from "@tarojs/components"
import {HighLevel} from "@/layout/high-level";
import {Fab} from "@/components/HomePageExtra";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import './fab.styl';
import '../components/rich-modal.styl'


const HardwayLayout = ({children}) => {
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
