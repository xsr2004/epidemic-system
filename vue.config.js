const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
    externals: {
      'BMap': 'BMap' // 百度地图配置
    }
  },
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
   
  

})
