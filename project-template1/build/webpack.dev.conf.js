var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
// 引入基本配置
var config = require('./webpack.config');
var webpack = require('webpack') ;

config.output.publicPath = '/';
config.devtool = '#source-map' ;

config.plugins = [
    // 添加三个插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        //filename: '../index.html',/**(上线环境)这个目录是相对于output的path当前目录作为基目录的 */
        filename: 'index.html',/**(开发环境)这个目录是相对于output的path当前目录作为基目录的 */
        template: path.resolve(__dirname, '../src/html/index.html'),
        inject: true
    })
].concat(config.plugins);

// 动态向入口配置中注入 webpack-hot-middleware/client?reload=true
// var devClient = 'webpack-hot-middleware/client';
//我们修改了devClient变量，将 ‘webpack-hot-middleware/client’ 
//替换成 ‘./build/dev-client’，最终会导致，我们入口配置会变成下面这样：
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;