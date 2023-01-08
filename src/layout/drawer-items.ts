import Taro from "@tarojs/taro"

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['React 井字棋游戏初始状态', async () => Taro.navigateTo({url: '/pages/tictactoe/index'})],
  ['React 井字棋游戏最终状态', async () => Taro.navigateTo({url: '/pages/tictactoe/index2'})],
  ['人工智能版井字棋游戏', async () => Taro.navigateTo({url: '/pages/tictactoe/ai'})],
  ['小程序版的 C++ Hello World', async () => Taro.navigateTo({url: '/pages/pearlsplus/hello'})],
  ['编程珠玑习题', async () => Taro.navigateTo({url: '/pages/subpages/pearlsplus/index'})],
  ['动态渲染', async () => Taro.navigateTo({url: '/pages/subpages/react-view/index'})],
  ['动态加载资源', async () => Taro.navigateTo({url: '/pages/subpages/react-view/browser'})],
  ['小程序直达器',
    async () => Taro.navigateTo({url: '/pages/index/index'})],
  // ['ip 地址', async () => Taro.navigateTo({url: '/pages/ip/index'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/subpages/about/index'})],
  ['支持哈德韦', async () => Taro.navigateTo({url: '/pages/subpages/order/support-me'})],
  // ['换脸', async () => Taro.navigateTo({url: '/pages/subpages/face-swap/index'})],
  ['人脸识别', async () => Taro.navigateTo({url: '/pages/subpages/face-swap/landmark'})],
  ['哈德韦的朋友们', async () => Taro.navigateTo({url: '/pages/subpages/friends/list'})]

  // ['测试', async () => Taro.navigateTo({url: '/pages/subpages/test/index'})],
])

if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
  drawerItems.set('向我咨询', async () => window.open('https://www.zhihu.com/consult/people/1073548674713423872'))
  drawerItems.set('源代码', async () => window.open('https://github.com/Jeff-Tian/weapp'))
  drawerItems.set('视频', async () => Taro.navigateTo({url: '/pages/subpages/video/detail?zVideoId=1492435273367248896'}))
  drawerItems.set('视频2', async () => Taro.navigateTo({url: `/pages/subpages/video/detail2?url=${encodeURIComponent(`https://www.zhihu.com/question/378598799/answer/1126026947`)}`}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
