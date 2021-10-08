import Taro from "@tarojs/taro"

export const drawerItems = new Map<string, () => any>([
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
])

export const onDrawerItemClick = index => [...drawerItems.values()][index]()
