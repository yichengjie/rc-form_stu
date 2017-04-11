var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

//这个可能是vue的特殊使用暂时不管
// config.vue = {
//     loaders: {
//         css: ExtractTextPlugin.extract("css")
//     }
// };

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    //公共模块的提取
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js',
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // 提取css为单文件
    //new ExtractTextPlugin("../[name].[contenthash].css"),
    new ExtractTextPlugin('main.css'),
    new HtmlWebpackPlugin({
        filename: '../index.html',/**(上线环境)这个目录是相对于output的path当前目录作为基目录的 */
        //filename: 'index.html',/**(开发环境)这个目录是相对于output的path当前目录作为基目录的 */
        template: path.resolve(__dirname, '../src/html/index.html'),
        inject: true
    })
].concat(config.plugins);

module.exports = config;