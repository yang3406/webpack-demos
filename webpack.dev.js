// 用法当在script 中的script 有  "build": "webpack", 那就是指向的这个js文件

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  // entry: './src/index.js', // 单个入口
  entry: { // 多个入口
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js' //单个入口 文件名可以写死
    filename: '[name].js' // 多个入口 用[name] 做占位符
  },
  mode: 'development', // 定义环境 ['none','development','production']
  module: {
    rules: [{
      test: /.js$/,
      use: 'babel-loader'
    }, {
      test: /.css$/,
      use: [
        'style-loader',
        'css-loader', // loader是链式调用 先解析css 在把解析的放到style中 
      ]
    },
    {
      test: /.less$/,
      use: [
        'style-loader',
        'css-loader', // loader是链式调用 先解析css 在把解析的放到style中 
        'less-loader'
      ]
    },
    {
      test: /.(png|jpg|gif|jpeg)$/,
      use: 'file-loader'
    },
    {
      test: /.(woff|woff2|eot|ttf|otf)$/,
      use: 'file-loader'
    }
    ]
  },
  plugins: [  // 文件编译后替换
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: { // 设置服务
    contentBase: './dist', // 服务指向目录
    hot: true //设置热更新
  }
}