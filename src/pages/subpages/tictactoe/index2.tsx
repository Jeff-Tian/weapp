import {Button, View} from "@tarojs/components"
import Taro from "@tarojs/taro";
import {gql} from "@apollo/client";
import HardwayLayout from "@/layout/hardway-layout";
import './tictactoe.styl'
import { DynamicContent } from "./dynamic-content";

// import divviewer from "../../adapters/divviewer";

const transformRequest = gql`query transformTsx {
                transform (url: "https://raw.githubusercontent.com/Jeff-Tian/TicTacToeTs/main/src/Game2.tsx", extra: "ReactDOM.render(<Game />, document.getElementById('root'))") {
                    text
                }
            }`

const TicTacToe = () => <HardwayLayout><View>
    以下有动态渲染的内容，请稍作等待…… 这是 React 官方井字棋教程的最终状态，玩家 X 和玩家 O 对战。
    <DynamicContent gql={transformRequest} />
    <View>
      我们可以在这个基础上，让玩家 O 自动下棋，可以点击按钮体验：
    </View>
    <Button onClick={() => Taro.navigateTo({url: '/pages/tictactoe/ai'})}>体验人工智能版井字棋</Button>
  </View></HardwayLayout>

export default TicTacToe
