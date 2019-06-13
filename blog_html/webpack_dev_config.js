const path = require('path');
const merge = require('webpack-merge');
const webpack_base_config = require('./webpack_base_config');

// 负责将html文档虚拟到根目录下
module.exports = merge(webpack_base_config, {

    // 开发模式
    mode: 'development',
    // 配置开发服务器, 并配置自动刷新
    devServer: {
        contentBase: path.join(__dirname),
        // 服务端口为9000
        port: 9600,
        host: "127.0.0.1",
        // 自动打开浏览器
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    devtool: "cheap-module-eval-source-map"

})