const subpages = [
  {
    root: `pages/subpages/auth/`,
    pages: ['authing', 'keycloak', 'profile']
  },
  {
    root: `pages/subpages/about`,
    pages: ['index']
  },
  {
    root: `pages/subpages/ip`,
    pages: ['index']
  },
  {
    root: `pages/subpages/video`,
    pages: ['index', 'detail', 'detail2']
  },
  {
    root: `pages/subpages/test`,
    pages: ['index']
  },
  {root: `pages/subpages/react-view`, pages: ['index', 'browser']},
  {
    root: `pages/subpages/pearlsplus`,
    pages: ['index', 'detail', 'c-detail', 'hello']
  },
  {
    root: `pages/subpages/order`,
    pages: ['support-me']
  },
  {
    root: `pages/subpages/face-swap`,
    pages: ['index', 'landmark']
  },
  {
    root: `pages/subpages/friends`,
    pages: ['list']
  },
  {
    root: `pages/subpages/red-package`,
    pages: ['index'],
  },
  {
    root: `pages/subpages/sticker`,
    pages: ['index'],
  },
  {
    root: `pages/subpages/brickverse`,
    pages: ['index']
  },
  {
    root: `pages/subpages/tictactoe`,
    pages: ['index', 'index2', 'ai']
  }
]


export default {
  pages: [
    'pages/yuque/index',
    'pages/yuque/article',
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '哈德韦',
    navigationBarTextStyle: 'black'
  },
  subpackages: subpages,
  enablePullDownRefresh: true,
  "embeddedAppIdList": ["wx9fe2a6e64bfa9dd6"]
}
