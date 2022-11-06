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
    pages: ['detail']
  },
  {
    root: `pages/subpages/test`,
    pages: ['index']
  },
  {root: `pages/subpages/react-view`, pages: ['index', 'browser']},
  {
    root: `pages/subpages/pearlsplus`,
    pages: ['index', 'detail', 'c-detail']
  }
]


export default {
  pages: [
    'pages/yuque/index',
    'pages/pearlsplus/1_6_1',
    'pages/pearlsplus/c1_6_1',
    'pages/pearlsplus/c1_6_2',
    'pages/yuque/article',
    'pages/index/index',
    'pages/weapp/index',
    'pages/tictactoe/index',
    'pages/tictactoe/index2',
    'pages/tictactoe/ai',
    'pages/pearlsplus/hello',
    'pages/auth/authing',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subpackages: subpages,
}
