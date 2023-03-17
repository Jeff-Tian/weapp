import {View} from "@tarojs/components"
import Taro from "@tarojs/taro";

const TicTacToe = () => {
  const url = '/pages/subpages/tictactoe/index2'

  Taro.navigateTo({url}).then()

  return <View>正在跳转到如下页面： {url}</View>
}

export default TicTacToe
