const {getAllDeepLinks} = require('../scripts/deeplinks')

const config = {
  projectName: 'weapp',
  date: '2021-8-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [
      // {from: 'src/pages/pearlsplus/proxy.wasm', to: 'dist/pages/pearlsplus/proxy.wasm'},
      // {from: 'src/pages/wasm/hello.wasm', to: 'dist/pages/wasm/hello.wasm'},
      {from: 'src/pages/wasm/index.js', to: 'dist/pages/wasm/index.js'},
      {from: 'src/pages/wasm/hello.js', to: 'dist/pages/wasm/hello.js'}
    ],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    esnextModules: ['taro-ui'],
    router: {
      mode: 'browser',
    },
    copy: {
      patterns:
        getAllDeepLinks().map(f => ({from: 'src/index.html', to: f}))
    }
  },
}

module.exports = merge => {
  return merge({}, config,
    process.env.NODE_ENV === 'development' ?
      require('./dev') :
      require('./prod'),
  )
}
