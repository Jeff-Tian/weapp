import Taro from "@tarojs/taro"

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['brickverse', async () => Taro.navigateTo({
    url: '/pages/subpages/brickverse/index',
  })],
  ['React 井字棋游戏初始状态', async () => Taro.navigateTo({url: '/pages/subpages/tictactoe/index'})],
  ['React 井字棋游戏最终状态', async () => Taro.navigateTo({url: '/pages/subpages/tictactoe/index2'})],
  ['人工智能版井字棋游戏', async () => Taro.navigateTo({url: '/pages/subpages/tictactoe/ai'})],
  ['小程序版的 C++ Hello World', async () => Taro.navigateTo({url: '/pages/subpages/pearlsplus/hello'})],
  ['编程珠玑习题', async () => Taro.navigateTo({url: '/pages/subpages/pearlsplus/index'})],
  ['动态渲染', async () => Taro.navigateTo({url: '/pages/subpages/react-view/index'})],
  ['动态加载资源', async () => Taro.navigateTo({url: '/pages/subpages/react-view/browser'})],
  ['小程序直达器',
    async () => Taro.navigateTo({url: '/pages/index/index'})],
  // ['ip 地址', async () => Taro.navigateTo({url: '/pages/ip/index'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/subpages/about/index'})],
  ['人脸识别', async () => Taro.navigateTo({url: '/pages/subpages/face-swap/landmark'})],
  ['哈德韦的朋友们', async () => Taro.navigateTo({url: '/pages/subpages/friends/list'})],
  ['红包🧧封面', async () => Taro.navigateTo({url: '/pages/subpages/red-package/index'})],
  ['微信表情', async () => Taro.navigateTo({url: '/pages/subpages/sticker/index'})],
  ['资源', async () => Taro.navigateTo({url: '/pages/subpages/video/index'})],
  // ['测试', async () => Taro.navigateTo({url: '/pages/subpages/test/index'})],
])

if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
  drawerItems.set('换脸', async () => Taro.navigateTo({url: '/pages/subpages/face-swap/index'}))

  drawerItems.set('向我咨询', async () => window.open('https://www.zhihu.com/consult/people/1073548674713423872'))

  drawerItems.set('支持哈德韦', async () => Taro.navigateTo({url: '/pages/subpages/order/support-me'}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
