const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 负责将html文档虚拟到根目录下

module.exports = {
    // 配置入口文件
    entry: ['@babel/polyfill', './src/index.js'],
    // 出口文件目录为根目录下dist, 输出的文件名为main
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'zhaoolee-[name].[hash:8].js',
        publicPath: '/'
    },
    optimization: {
      // runtimeChunk: 'single',
      splitChunks: {
          chunks: 'all', // 默认 async 可选值 all 和 initial
          // maxInitialRequests: Infinity, // 一个入口最大的并行请求数
          // minSize: 0, // 避免模块体积过小而被忽略
          // minChunks: 1, // 默认也是一表示最小引用次数
          // cacheGroups: {
          //     vendor: {
          //         test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
          //         name(module, chunks, chcheGroupKey) { // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
          //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称
          //             return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除
          //         }

          //     }
          // }
      }
    },
    // 装载虚拟目录插件
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        }),
      new CleanWebpackPlugin(), // 构建之前清理dist目录
      new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
      new HtmlWebpackPlugin({
        // 虚拟的html文件名 index.html
        filename:  "index.html",
        // 虚拟html的模板为 src下的index.html
        template: './src/index.html'
    }),
      //将images拷贝到dist目录
      new CopyPlugin([
        { from: path.join(__dirname,'/images'), to: path.join(__dirname, '/dist/images') },
        { from: path.join(__dirname,'/static'), to: path.join(__dirname, '/dist/static') },
      ]),
      // 添加版权
      new webpack.BannerPlugin({
        banner: "Copyright © 2019 FANGYUANXIAOZHAN. All Rights Reserved."
      })
    ],
    // 配置loader
    module: {
        // 根据文件后缀匹配规则
        rules: [
            // 配置js/jsx语法解析
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
              test: [/\.css$/, /\.scss$/],
              use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "postcss-loader",
                "sass-loader" // compiles Sass to CSS
              ]
            },
            
              {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              }
            
        ]

    }
}
