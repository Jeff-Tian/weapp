module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {
    enableSourceMap: false,
    terser: {
      enable: true,
      config: {
        // 配置项同 https://github.com/terser/terser#minify-options
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
