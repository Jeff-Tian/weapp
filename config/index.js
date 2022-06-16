const {getAllDeepLinks} = require('../scripts/deeplinks')
const path = require("path");
const packageJson = require('../package.json');

// 如果你使用 VSCode 作为开发工具， 你还可以使用注释的语法引入插件包含的声明文件，可获得类似于 Typescript 的友好提示
/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
  // 微信小程序
  weapp: {
    appid: "wx8c777d630f2b78e3",
    privateKeyPath: "private.key"
  },
  // 字节跳动小程序
  tt: {
    email: "字节小程序邮箱",
    password: "字节小程序密码"
  },
  // 支付宝小程序
  alipay: {
    appId: "支付宝小程序appId",
    toolId: "工具id",
    privateKeyPath: "密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem"
  },
  // 百度小程序
  swan: {
    token: "鉴权需要的token令牌"
  },
  // 版本号
  version: packageJson.version,
  // 版本发布描述
  desc: packageJson.description
}

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

  plugins: [
    ["@tarojs/plugin-mini-ci", CIPluginOpt]
  ],

  defineConstants: {},
  copy: {
    patterns: [
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
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js'
    },
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
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@': path.resolve(__dirname, '../src'),
    '~@': path.resolve(__dirname, '../src/styles'),
  },
}

module.exports = merge => {
  return merge({}, config,
    process.env.NODE_ENV === 'development' ?
      require('./dev') :
      require('./prod'),
  )
}
