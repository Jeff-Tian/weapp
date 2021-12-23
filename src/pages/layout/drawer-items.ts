import Taro from "@tarojs/taro"
import ENV_TYPE = Taro.ENV_TYPE

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['智能三子棋小游戏', async()=>Taro.navigateTo({url: '/pages/tictactoe/index'})],
  ['编程珠玑习题（c++ 版）', async()=>Taro.navigateTo({url: '/pages/pearlsplus/index'})],
  ['小程序直达器',
    async () => Taro.navigateTo({url: '/pages/index/index'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/about/index'})],
])

if (Taro.getEnv() === ENV_TYPE.WEB) {
  drawerItems.set('小程序', async () => Taro.navigateTo({url: '/pages/weapp/index'}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
