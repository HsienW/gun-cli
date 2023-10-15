#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const {create} = require('../lib/create');

program
    // 定義命令和參數
    .command('create <app-name>')
    .description('create a new sub app')
    // -f or --force 為強制創建，如果創建的目錄存在則直接覆蓋
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 在 create.js 中執行創建任務
        create(name, options);
    })

program
    // 配置版號
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]');

// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        // console.log(option)
        console.log("project name is " + chalk.bold(name));

        console.log("project name is " + chalk.cyan(name));
        console.log("project name is " + chalk.green(name));

        console.log("project name is " + chalk.bgRed(name));

        console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
        console.log("project name is " + chalk.hex('#049CDB').bold(name));
        console.log("project name is " + chalk.bgHex('#049CDB').bold(name));
    });

program
    // 监听 --help 执行
    .on('--help', () => {

        console.log('\r\n' + figlet.textSync('Gun CLI', {
            font: 'ANSI Regular',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 60,
            whitespaceBreak: true
        }));

        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`gun <command> --help`)} for detailed usage of given command\r\n`);
    })


// 解析用戶傳入參數
program.parse(process.argv);


