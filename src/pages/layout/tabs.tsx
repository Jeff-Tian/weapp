import Taro from '@tarojs/taro'
import {AtTabs, AtTabsPane} from "taro-ui";
import {View} from "@tarojs/components";
import {useState} from "react";

const HardwayTabs = ({children}) => {
  const [currentTab, setCurrentTab] = useState(0)

  const tabs = [{title: '《编程珠玑》'}, {title: '博文'}, {title: 'AI 井字棋'},]
  return <AtTabs tabList={tabs} current={currentTab} onClick={(index) => {
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
  </AtTabs>
}

export default HardwayTabs
