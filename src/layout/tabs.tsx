import Taro, {ENV_TYPE, useRouter} from '@tarojs/taro'
import {AtTabs, AtTabsPane} from "taro-ui";
import {OfficialAccount, View} from "@tarojs/components";
import {Banner, Fab} from "@/components/HomePageExtra";
import {useState} from "react";

import './tabs.styl'

const HardwayTabs = ({children}) => {
  const router = useRouter()

  let tab = 0
  if (router.path.startsWith('/pages/pearlsplus')) {
    tab = 0
  }

  if (router.path.startsWith('/pages/yuque')) {
    tab = 1
  }

  if (router.path.startsWith('/pages/tictactoe')) {
    tab = 2
  }

  const [currentTab, setCurrentTab] = useState(tab)

  const tabs = [{title: '《编程珠玑》'}, {title: '博文'}, {title: 'AI 井字棋'},]
  return <View>
    {Taro.getEnv() === ENV_TYPE.WEAPP && <OfficialAccount />}
    {currentTab === 1 && <Banner />}
    <AtTabs tabList={tabs} current={currentTab} onClick={(index) => {
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
      <AtTabsPane current={currentTab} index={1}><View>
        {children}
      </View></AtTabsPane>
      <AtTabsPane current={currentTab} index={2}><View>{children}</View></AtTabsPane>
    </AtTabs>


    {currentTab === 1 && <Fab />}
  </View>
}

export default HardwayTabs
