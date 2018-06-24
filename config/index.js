// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let tyBuild = require(resolve('tyBuild.json'))

function resolve (dir) {
    return path.join(process.cwd(), dir)
}

module.exports = {
    dev: {
        env: require('./dev.env'),
        index: resolve(tyBuild.devDir + '/index.html'),
        port: 8080,
        autoOpenBrowser: true,
        assetsRoot: resolve(tyBuild.devDir),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '',
        proxyTable: {},
        productionSourceMap: true,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },
    build: {
        env: require('./build.env'),
        index: resolve(tyBuild.buildDir + '/index.html'),
        assetsRoot: resolve(tyBuild.buildDir),
        assetsSubDirectory: 'assets',
        assetsPublicPath: tyBuild.build.resourcePrefix,
        proxyTable: {},
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        bundleAnalyzerReport: true
    },
    publish: {
        env: require('./prod.env'),
        index: resolve(tyBuild.releaseDir + '/index.html'),
        assetsRoot: resolve(tyBuild.releaseDir),
        assetsSubDirectory: 'assets',
        assetsPublicPath: tyBuild.prod.resourcePrefix,
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: false
    }
}
