import Taro from "@tarojs/taro"
import ENV_TYPE = Taro.ENV_TYPE

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['React 井字棋游戏初始状态', async () => Taro.navigateTo({url: '/pages/tictactoe/index'})],
  ['React 井字棋游戏最终状态', async () => Taro.navigateTo({url: '/pages/tictactoe/index2'})],
  ['人工智能版井字棋游戏', async () => Taro.navigateTo({url: '/pages/tictactoe/ai'})],
  ['小程序版的 C++ Hello World', async () => Taro.navigateTo({url: '/pages/pearlsplus/hello'})],
  ['编程珠玑习题', async () => Taro.navigateTo({url: '/pages/subpages/pearlsplus/index'})],
  ['编程珠玑习题（c++ 版）1.6.1', async () => Taro.navigateTo({url: '/pages/pearlsplus/1_6_1'})],
  ['编程珠玑习题（c 版）1.6.1', async () => Taro.navigateTo({url: '/pages/pearlsplus/c1_6_1'})],
  ['编程珠玑习题（c 版）1.6.2', async () => Taro.navigateTo({url: '/pages/pearlsplus/c1_6_2'})],
  ['动态渲染', async () => Taro.navigateTo({url: '/pages/subpages/react-view/index'})],
  ['动态加载资源', async () => Taro.navigateTo({url: '/pages/subpages/react-view/browser'})],
  ['小程序直达器',
    async () => Taro.navigateTo({url: '/pages/index/index'})],
  // ['ip 地址', async () => Taro.navigateTo({url: '/pages/ip/index'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/subpages/about/index'})],
  ['通过 Authing 登录', async () => Taro.navigateTo({url: '/pages/subpages/auth/authing'})],
  // ['通过 Keycloak 登录', async () => Taro.navigateTo({url: '/pages/subpages/auth/keycloak'})],
  ['视频', async () => Taro.navigateTo({url: '/pages/subpages/video/index'})],
  // ['测试', async () => Taro.navigateTo({url: '/pages/subpages/test/index'})],
])

if (Taro.getEnv() === ENV_TYPE.WEB) {
  drawerItems.set('向我咨询', async () => window.open('https://www.zhihu.com/consult/people/1073548674713423872'))
  drawerItems.set('小程序', async () => Taro.navigateTo({url: '/pages/weapp/index'}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
