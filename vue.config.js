const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@/*': path.resolve(__dirname, './src/*'),
  //       // '~*': path.resolve(__dirname, 'node_modules/*')
  //     },
  //     extensions: ['.js', '.vue', '.json', '.less']
  //   },
  // },
  pluginOptions: {
    i18n: {
      locale: 'vi',
      fallbackLocale: 'vi',
      localeDir: 'assets/i18n',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
    'style-resources-loader': {
      options: { javascriptEnabled: true },
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/themes/ant/main.less')]
    }
  }
}
