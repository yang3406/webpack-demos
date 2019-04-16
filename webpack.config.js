const path = require('path');
/* const CleanWebpackPlugin = require('clean-webpack-plugin'); */

module.exports = {
  entry: {
    app: './app.js' //需要打包文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', //输入的文件位置
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  },
  /* plugins: [
    new CleanWebpackPlugin() //删除 output path下的所有目录
  ] */
}