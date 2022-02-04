import Taro from '@tarojs/taro'
import {AtFab, AtTabs, AtTabsPane} from "taro-ui";
import {OfficialAccount, View, Text} from "@tarojs/components";
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
    <AtTabsPane current={currentTab} index={1}><View>
      {currentTab === 1 ?
        <View>
          <AtFab onClick={() => Taro.navigateToMiniProgram({
            appId: 'wx71b447f4cd52b251',
            path: 'pages/webview/index.html?url=/tian-jie/notes/xvpag4/edit',
            extraData: {},
            envVersion: 'release'
          })}>
            <Text className='at-fab__icon at-icon at-icon-menu'>.</Text>
          </AtFab>
        </View> : <View>{currentTab}</View>
      }
      {children}</View></AtTabsPane>
    <AtTabsPane current={currentTab} index={2}><View>{children}</View></AtTabsPane>
  </AtTabs></View>
}

export default HardwayTabs
