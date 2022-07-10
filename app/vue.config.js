module.exports = {
  //关闭eslint
  lintOnSave:false,
  // 新创建vue项目后,会出现第一行代码爆红的现象,解决它的方法
  transpileDependencies: true,
  // 去掉打包js文件中的map文件
  productionSourceMap:false,
  // http://0.0.0.0:8081 解决办法
  devServer: {
    // disableHostCheck: false,           
    host: 'localhost',
    port: 8081,
    https: false,
    hot: false,
    // 代理跨域
    proxy:  {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api' : ''}
      }
    }
  }
}
