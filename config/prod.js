module.exports = {
  env: {
    NODE_ENV: '"production"',
    BRICKVERSE_TOKEN: '"209d5ce86d2dcce26d3b0408147e69b3d3e7f233e67d889e1b46a9133271b37fbefb666d918c6c6fd5799450a525247e5d1db3826678afdcd2b04a5ae4826de9773728faf838ea6185b15ab66ec91f704f2b7ba664045c1b876b33cf7ac0a015b16639910ecf2c6c7fcf5bd8cd4d7f0ffa17fb21832c115a85bac2be2b05b675"'
  },
  defineConstants: {},
  mini: {
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
