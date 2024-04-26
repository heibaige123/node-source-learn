const {exec} = require('child_process');
const {getSecondDir} = require('./utils');

getSecondDir().then((dirs) => {
    dirs.forEach((dir) => {
        exec(`cd ${dir} && pnpm i && cd ..`, (err) => {
            console.log(`${dir} 安装依赖成功`);

            if (err) {
                console.error('安装失败：', dir, err);
            }
        });
    });
});
