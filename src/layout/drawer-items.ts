import Taro from "@tarojs/taro"

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['井字棋游戏', async () => Taro.navigateTo({url: '/pages/subpages/tictactoe/ai'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/subpages/about/index'})],
  // ['哈德韦的朋友们', async () => Taro.navigateTo({url: '/pages/subpages/friends/list'})],
  // ['微信表情', async () => Taro.navigateTo({url: '/pages/subpages/sticker/index'})],
  // ['测试', async () => Taro.navigateTo({url: '/pages/subpages/test/index'})],
])

if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
  drawerItems.set('brickverse', async () => Taro.navigateTo({
    url: '/pages/subpages/brickverse/index',
  }))

  drawerItems.set('换脸', async () => Taro.navigateTo({url: '/pages/subpages/face-swap/index'}))

  drawerItems.set('向我咨询', async () => window.open('https://www.zhihu.com/consult/people/1073548674713423872'))

  drawerItems.set('支持哈德韦', async () => Taro.navigateTo({url: '/pages/subpages/order/support-me'}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
