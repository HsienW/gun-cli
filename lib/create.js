const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const create = async function (name, options) {
    // 取值
    console.log('==== create.js ====', name, options);
    // 生成文件目錄 process.cwd() 對應控制台位置
    const cwd = process.cwd();
    // 目錄地址
    const targetPath = path.join(cwd, name)

    console.log('==== 生成文件目錄 ====');
    console.log(cwd);
    console.log('==== 目錄地址 ====');
    console.log(targetPath);

    // 已存在是否要強制執行？
    if (fs.existsSync(targetPath)) {
        // 是的話就移除舊有的
        if (options.force) {
            await fs.remove(targetPath)
        } else {
            // TODO：询问用户是否确定要覆盖
        }
    }

}

module.exports = {
    create
}
