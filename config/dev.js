module.exports = {
  env: {
    NODE_ENV: '"development"',
    // FACE_SWAP_ENV: '"local"'
    BRICKVERSE_TOKEN: '"209d5ce86d2dcce26d3b0408147e69b3d3e7f233e67d889e1b46a9133271b37fbefb666d918c6c6fd5799450a525247e5d1db3826678afdcd2b04a5ae4826de9773728faf838ea6185b15ab66ec91f704f2b7ba664045c1b876b33cf7ac0a015b16639910ecf2c6c7fcf5bd8cd4d7f0ffa17fb21832c115a85bac2be2b05b675"'
  },
  defineConstants: {},
  mini: {
    // webpackChain(chain) {
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    // }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     */
    // webpackChain(chain) {
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    // }
  },
}
