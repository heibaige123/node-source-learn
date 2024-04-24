const { exec } = require('child_process');
const { getDir } = require('./utils');

getDir().then((dirs) => {
    dirs.forEach((dir) => {
        exec(`cd ${dir} && pnpm i && cd ..`, (err) => {
            if (err) {
                console.error('安装失败：', dir, err);
            }
        });
    });
});
