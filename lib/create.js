const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./Generator');

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
            // 詢問使用者是否確定要覆蓋
            let {action} = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        }, {
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ])

            if (!action) {
                return;
            } else if (action === 'overwrite') {
                // 刪除已經存在的目錄
                console.log(`\r\nRemoving...`)
                await fs.remove(targetPath)
            }
        }
    }

    // 建立 project
    const generator = new Generator(name, targetPath);
    await generator.create();
}

module.exports = {
    create
}
