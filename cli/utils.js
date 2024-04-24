const fs = require('fs');

// 获取当前工作目录
const currentDir = process.cwd();

// 需排除的目录
const excludeDirs = ['node_modules', '.git', '.vscode', 'cli'];

async function getDir() {
    // 读取当前目录下的所有文件和目录
    const directories = fs
        .readdirSync(currentDir, { withFileTypes: true })
        .filter((file) => {
            if (file.isDirectory() && !excludeDirs.includes(file.name)) {
                return true;
            }
            return false;
        })
        .map((file) => file.name);

    return directories;
}

module.exports = {
    getDir
};
