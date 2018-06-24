var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var fs = require('fs')

function getTmplPath(){
    if (fs.existsSync(resolve('src/tmpl/index.html'))) {
        return resolve('src/tmpl/index.html')
    } else {
        return 'index.html'
    }
}

function resolve (dir) {
    return path.join(process.cwd(), dir)
}

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: config.dev.assetsRoot,
        filename: path.posix.join(config.dev.assetsSubDirectory, 'js/[name].[hash:8].js'),
        chunkFilename: path.posix.join(config.dev.assetsSubDirectory, 'js/[id].[hash:8].js'),
        publicPath: config.dev.assetsPublicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: path.posix.join(config.dev.assetsSubDirectory, 'css/[name].[contenthash:8].css')
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.dev.index,
            template: getTmplPath(),
            env: 'dev',
            inject: true
        }),
        new FriendlyErrorsPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve('static'),
                to: path.join(config.dev.assetsRoot, 'static'),
                ignore: ['.*']
            }
        ])
    ]
})
