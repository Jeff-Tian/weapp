import {AtDrawer, AtNavBar} from "taro-ui"
import {View} from "@tarojs/components"

const HardwayLayout = (props) => {
  return <View>
    <AtNavBar
      onClickRgIconSt={() => {
      }}
      onClickRgIconNd={() => {
      }}
      onClickLeftIcon={() => {
      }}
      color='#000'
      title='哈德韦的个人小程序'
      leftText='返回'
      leftIconType='chevron-left'
      rightFirstIconType='bullet-list'
      rightSecondIconType='user'
    />

    {props.children}

    <AtDrawer
      show
      mask
      right
      onClose={console.log}
      items={['菜单1', '菜单2']}
    ><View>Hello</View></AtDrawer>
  </View>
}

export default HardwayLayout
