const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const webpack_base_config = require('./webpack_base_config');

// 负责将html文档虚拟到根目录下
module.exports = merge(webpack_base_config, {
    // 生产模式
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        "process.env": { 
           NODE_ENV: JSON.stringify("production") 
         }
      })
    ]
})