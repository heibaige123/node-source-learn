const { exec } = require('child_process');
const { getDir } = require('./utils');
const fs = require('fs').promises;

getDir().then((dirs) => {
    try {
        dirs.forEach(async (dir) => {
            exec(`cd ${dir}`);
            await fs.rm('node_modules', { recursive: true, force: true });
            exec('pnpm i');
            exec('cd ..');
        });
    } catch (err) {
        console.error('安装失败：', err);
    }
});
