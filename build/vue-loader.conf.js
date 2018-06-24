var utils = require('./utils')
var config = require('../config/index')
var isExtract = false, souceMapPath = '';

function getSourceMap () {
    if (process.env.NODE_ENV === 'production'){
        souceMapPath = config.publish.productionSourceMap;
        isExtract = true;
    } 
    else if (process.env.NODE_ENV === 'development'){
        souceMapPath = config.dev.productionSourceMap;
        isExtract = true; // 测试也生成css吧，方便调试
    }
}

getSourceMap();

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: souceMapPath,
        extract: isExtract
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
