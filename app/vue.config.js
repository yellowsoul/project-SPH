module.exports = {
  //关闭eslint
  lintOnSave:false,
  transpileDependencies: true,
  // http://0.0.0.0:8081 解决办法
  devServer: {
    // disableHostCheck: false,           
    host: 'localhost',
    port: 8081,
    https: false,
    hot: false,
    proxy: null
  }
}
