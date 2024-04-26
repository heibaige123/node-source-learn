const {exec} = require('child_process');
const {getSecondDir} = require('./utils');
const fs = require('fs').promises;

getSecondDir().then((dirs) => {
    try {
        dirs.forEach(async (dir) => {
            console.log(`${dir} 删除依赖啦`);
            exec(`cd ${dir}`);
            await fs.rm('node_modules', {recursive: true, force: true});
            console.log(`${dir} 删除依赖啦成功`);
            exec('cd ..');
        });
    } catch (err) {
        console.error('安装失败：', err);
    }
});
