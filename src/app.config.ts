const subpages = [
  {
    root: `pages/subpages/auth/`,
    pages: ['authing', 'keycloak']
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
    pages: ['index']
  }
]



export default {
  pages: [
    'pages/pearlsplus/1_6_1',
    'pages/pearlsplus/c1_6_1',
    'pages/pearlsplus/c1_6_2',
    'pages/yuque/index',
    'pages/yuque/article',
    'pages/index/index',
    // 'pages/about/index',
    'pages/weapp/index',
    'pages/tictactoe/index',
    'pages/tictactoe/index2',
    'pages/tictactoe/ai',
    'pages/pearlsplus/hello',
    // 'pages/ip/index',
    // 'pages/video/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subpackages: subpages,
}
