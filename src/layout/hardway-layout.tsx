import {OfficialAccount, View} from "@tarojs/components"
import {HighLevel} from "@/layout/high-level";
import {Fab} from "@/components/HomePageExtra";
import Taro, {ENV_TYPE, Component} from "@tarojs/taro";
import './fab.styl';
import '../components/rich-modal.styl'


class HardwayLayout implements Component {
  private props: any;

  constructor(props) {
    this.props = props
  }

  onPullDownRefresh = () => {
    console.log('用户下拉刷新');

    Taro.stopPullDownRefresh();
  }

  render() {
    return <View>
      <HighLevel />
      <View style={{minHeight: '1000px'}}>
        {Taro.getEnv() === ENV_TYPE.WEAPP && <OfficialAccount />}
        {this.props.children}
      </View>
      <Fab />
    </View>
  }
}

export default HardwayLayout
