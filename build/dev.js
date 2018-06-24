'use strict'
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const open = require('opn');
const webpackConfig = require('./webpack.dev.conf');
const argv = require('../argv');
const path = require('path');

let app = express();
let compiler = webpack(webpackConfig);
//监听代码变更，实时编译
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,    //绑定中间件的公共路径,与webpack配置的路径相同
    quiet: true //向控制台显示任何内容
});
//用来在代码变更时刷新浏览器
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});

compiler.plugin('compilation', function(compilation) {
    //接收编译结束事件
    compilation.plugin('html-webpack-plugin-after-emit', function(data, callback) {
        //通知hotMiddleware重新加载页面
        hotMiddleware.publish({ action: 'reload'});
        callback();
    })
});
//解决浏览器刷新页面404的问题
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

let port = argv['p'];
port = parseInt(port ? port : 8000);

console.log(chalk.green(`服务启动中`));
let uri = `http://localhost:${port}`;


devMiddleware.waitUntilValid(() => {
    console.log(chalk.green(`监听${uri}`));
    if ( process.env.NODE_ENV !== 'testing' ) {
        open(uri);
    }
});

app.listen(port);