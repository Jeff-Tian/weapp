import Taro from '@tarojs/taro'
import {AtTabs, AtTabsPane} from "taro-ui";
import {OfficialAccount, View} from "@tarojs/components";
import {useState} from "react";
import useRouter = Taro.useRouter;

const HardwayTabs = ({children}) => {
  const router = useRouter()

  let tab = 0
  if (router.path === '/pages/pearlsplus/1_6_1') {
    tab = 0
  }

  if (router.path === '/pages/yuque/index') {
    tab = 1
  }

  if (router.path === '/pages/tictactoe/ai') {
    tab = 2
  }

  const [currentTab, setCurrentTab] = useState(tab)

  const tabs = [{title: '《编程珠玑》'}, {title: '博文'}, {title: 'AI 井字棋'},]
  return <View>
    <OfficialAccount/><AtTabs tabList={tabs} current={currentTab} onClick={(index) => {
    setCurrentTab(index)

    if (index === 0) {
      Taro.navigateTo({url: '/pages/pearlsplus/1_6_1'}).then()
    }

    if (index === 1) {
      Taro.navigateTo({url: '/pages/yuque/index'}).then()
    }

    if (index === 2) {
      Taro.navigateTo({url: '/pages/tictactoe/ai'}).then()
    }
  }}
  >
    <AtTabsPane current={currentTab} index={0}><View>{children}</View></AtTabsPane>
    <AtTabsPane current={currentTab} index={1}><View>{children}</View></AtTabsPane>
    <AtTabsPane current={currentTab} index={2}><View>{children}</View></AtTabsPane>
  </AtTabs></View>
}

export default HardwayTabs
