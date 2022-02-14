const taroApi = {
  login: () => {
    return Promise.resolve({
      code: Date.now().toString(),
    })
  },
  setStorageSync: () => {},
  getStorageSync: () => {},
  removeStorageSync: () => {},
  getSystemInfoSync: () => ({
      brand: '',
      model: '',
      screenWidth: '',
      screenHeight: '',
      windowHeight: '',
      windowWidth: '',
      statusBarHeight: '',
      system: '',
      version: '',
      SDKVersion: '',
      pixelRatio: '',
      benchmarkLevel: '',
      language: '',
  }),
  getMenuButtonBoundingClientRect: () => {},
  getEnv: () => {},
  ENV_TYPE: {},
  useRouter: ()=>({path: '/pages/not/exist'}),
}

export default taroApi
