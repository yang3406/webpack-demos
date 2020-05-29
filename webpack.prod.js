// 用法当在script 中的script 有  "build": "webpack", 那就是指向的这个js文件

'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimzeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/index.js', // 单个入口
  entry: { // 多个入口
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js' //单个入口 文件名可以写死
    filename: '[name]_[chunkhash:8].js' // 多个入口 用[name] 做占位符 文件指纹chunkhash 8位
  },
  mode: 'production', // 定义环境 ['none','development','production']
  module: {
    rules: [{
      test: /.js$/,
      use: 'babel-loader'
    }, {
      test: /.css$/,
      // use: [ // 插入到header标签里面
      //   'style-loader',
      //   'css-loader', // loader是链式调用 先解析css 在把解析的放到style中 
      // ]
      use: [ //编译为独立css文件
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    },
    {
      test: /.less$/,
      use: [
        // 'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader', // loader是链式调用 先解析css 在把解析的放到style中 
        'less-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                browsers: ['last 2 version', '>1%', 'ios 7']
              })
            ]
          }
        }
      ]

    },
    {
      test: /.(png|jpg|gif|jpeg)$/,
      // use: 'file-loader'
      use: [
        {
          loader: 'file-loader',
          options: { //添加文件后缀 指纹
            name: '[name]_[hash:8].[ext]'
          }
        },
      ]

    },
    {
      test: /.(woff|woff2|eot|ttf|otf)$/,
      use: 'file-loader'
    }
    ]
  },
  plugins: [ // 把css提取为一个独立文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimzeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CleanWebpackPlugin()
  ]
}