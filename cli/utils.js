const fs = require('fs');

// 获取当前工作目录
const currentDir = process.cwd();

// 需排除的目录
const excludeDirs = ['node_modules', '.git', '.vscode', 'cli'];

/**
 * 读取当前目录下的所有目录
 */
async function getTopDir() {
    const directories = fs
        .readdirSync(currentDir, {withFileTypes: true})
        .filter((file) => {
            if (file.isDirectory() && !excludeDirs.includes(file.name)) {
                return true;
            }
            return false;
        })
        .map((directory) => directory.name);

    return directories;
}

/**
 *  读取当前目录下的所有二级目录
 */
async function getSecondDir() {
    const directories = [];
    const topDir = await getTopDir();

    topDir.forEach((dir) => {
        const subDir = fs
            .readdirSync(`${currentDir}/${dir}`, {withFileTypes: true})
            .filter((file) => {
                if (file.isDirectory() && !excludeDirs.includes(file.name)) {
                    return true;
                }
                return false;
            })
            .map((directory) => `${dir}/${directory.name}`);

        directories.push(...subDir);
    });

    return directories;
}

module.exports = {
    getTopDir,
    getSecondDir,
};
