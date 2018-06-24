process.env.NODE_ENV = 'development'

var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config/index')
var webpackConfig = require('./webpack.build.conf')

console.log(chalk.cyan(' Building for development build... \n'))


rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
    })
})

