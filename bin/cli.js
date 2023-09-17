#!/usr/bin/env node

const program = require('commander');
const create = require('../lib/create.js');

program
    // 定義命令和參數
    .command('create <app-name>')
    .description('create a new sub app')
    // -f or --force 為強制創建，如果創建的目錄存在則直接覆蓋
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 在 create.js 中執行創建任務
        create(name, options)
    })

program
    // 配置版號
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

// 解析用戶傳入參數
program.parse(process.argv);


