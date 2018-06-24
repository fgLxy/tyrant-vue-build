const fs = require('fs-extra');

let loadConfig = () => {
    try {
        return fs.readJsonSync('tyBuild.json');
    } catch (e) {
        console.error(chalk.red('加载构建配置文件tyBuild.json失败.'));
        return;
    }    
}

module.exports = loadConfig();