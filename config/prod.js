module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {
    webpackChain(chain) {
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    },
    enableSourceMap: false,
    terser: {
      enable: true,
      config: {
        // 配置项同 https://github.com/terser/terser#minify-options
        ecma: "2015",
        passes: 2,
        reduce_funcs: true,
        toplevel: true,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        warnings: false,
        format: {
          comments: false,
        },
        mangle: {
          eval: true,
          module: true,
          toplevel: true,
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        },
        compress: {
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: true,
          drop_debugger: true
        },
        extractComments: false,
        sourceMap: false,
        parallel: true
      },
    },
    csso: {
      enable: false,
      config: {
        // 配置项同 https://cssnano.co/docs/what-are-optimisations/
      },
    },
  },
  h5: {
    enableSourceMap: false,
    csso: {
      enable: false,
    },
  },
};
