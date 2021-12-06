import Taro from '@tarojs/taro'
import { AtDrawer, AtNavBar } from "taro-ui"
import { View } from "@tarojs/components"
import { useState } from "react"
import { loginByQrCode } from "../../services/zhihu"
import { drawerItems, onDrawerItemClick } from "./drawer-items"
import { StorageKeys } from "../../common/constants"


const HardwayLayout = (props) => {
  const [showDrawer, setShowDrawer] = useState(false)

  const zhihuUserInfo = Taro.getStorageSync(StorageKeys.zhihuUserInfo)

  return <View>
    <AtNavBar
      onClickRgIconSt={() => {
        setShowDrawer(true)
      }}
      onClickRgIconNd={() => {
        loginByQrCode()
      }}
      onClickLeftIcon={() => {
      }}
      color='#000'
      title='哈德韦的个人小程序'
      leftText='返回'
      leftIconType='chevron-left'
      rightFirstIconType='bullet-list'
      rightSecondIconType={zhihuUserInfo ? { value: 'user', color: 'blue' } : 'user'}
    />

    {props.children}

    <AtDrawer
      show={showDrawer}
      mask
      right
      onClose={() => setShowDrawer(false)}
      items={[...drawerItems.keys()]}
      onItemClick={onDrawerItemClick}
    ><View>Hello</View></AtDrawer>
  </View>
}

export default HardwayLayout
