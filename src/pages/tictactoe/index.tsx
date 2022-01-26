import {Button, View} from "@tarojs/components"
import Taro from "@tarojs/taro";
import {gql} from "@apollo/client";
import './tictactoe.styl'
import HardwayLayout from "../layout/hardway-layout";
import {DynamicContent} from "./dynamic-content";

// import divviewer from "../../adapters/divviewer";

const transformRequest = gql`query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/Game.tsx", extra: "ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`

const TicTacToe = () => {

  return <HardwayLayout><View>
    以下是动态渲染的内容，原始内容来自 React 官方井字棋教程的初始状态（https://codepen.io/gaearon/pen/oWWQNa?editors=0010），即展示一个棋盘。

    <DynamicContent gql={transformRequest} />

    <View>
      虽然不能互动，但是它展示了 react-view 的能力，可以部分打破个人版小程序不能加载 webview 的限制。要有互动也是可能的，比如通过加载 React 官方井字棋教程的最终状态即可：
    </View>
    <Button onClick={() => Taro.navigateTo({url: '/pages/tictactoe/index2'})}>体验互动版 React 井字棋</Button>
  </View></HardwayLayout>
}

export default TicTacToe
