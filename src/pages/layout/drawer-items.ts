import Taro from "@tarojs/taro"
import ENV_TYPE = Taro.ENV_TYPE

export const drawerItems = new Map<string, () => void>([
  ['博文', async () => Taro.navigateTo({
    url: '/pages/yuque/index',
  })],
  ['领英资料', async () =>
    Taro.navigateToMiniProgram({
      appId: 'wxbd95fba53da71eaf',
      path: '/src/pages/profile/profile.html?peopleId=ACoAAAd6TWQB6lITfCmh2bF8Byn7Fmlrq2vbbaI',
      extraData: {},
      envVersion: 'release'
    })],
  ['小程序直达器',
    async () => Taro.navigateTo({url: '/pages/index/index'})],
  ['关于', async () => Taro.navigateTo({url: '/pages/about/index'})],
])

if (Taro.getEnv() === ENV_TYPE.WEB) {
  drawerItems.set('小程序', async () => Taro.navigateTo({url: '/pages/weapp/index'}))
}

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
