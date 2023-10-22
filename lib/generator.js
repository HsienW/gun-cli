const {getRepoList, getTagList} = require('./http');
const ora = require('ora');
const inquirer = require('inquirer');
const util = require('util');
const path = require('path');
const downloadGitRepo = require('download-git-repo'); // 額外處理不支援 Promise
const chalk = require('chalk');

// 增加 loading 動畫
async function getLoading(fn, message, ...args) {
    // ora 初始化 負責傳入提示 message
    const spinner = ora(message);
    // 顯示 loading 動畫
    spinner.start();

    try {
        const result = await fn(...args);
        // 狀態修改為成功
        spinner.succeed();
        return result;
    } catch (error) {
        // 狀態修改為失敗
        spinner.fail('Request failed...')
    }
}

function Generator(name, targetDir) {
    this.name = name;
    // 要建立的路徑
    this.targetDir = targetDir;
    // 改造 download-git-repo 支援 promise
    this.downloadGitRepo = util.promisify(downloadGitRepo);

    // 取得用戶的設定值
    this.getRepo = async function () {
        // 1. get repo info
        const repoList = await getLoading(getRepoList, 'waiting fetch template');

        if (!repoList || repoList.length === 0) {
            return;
        }

        // 取出名稱
        const repos = repoList.map(item => item.name);

        // 2. 給用戶選擇自己要下載的模板
        const {repo} = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'Please choose a template to create project'
        })

        // 3. 選擇的名稱
        return repo;
    }

     this.getTag = async function (repo) {
        // 1. 比照 repo 結果獲取對應 tag list
        const tags = await getLoading(getTagList, 'waiting fetch tag', repo);

        if (!tags || tags.length === 0) {
            return;
        }

        // 取得 tag 名
        const tagsList = tags.map(item => item.name);

        // 2. 給用戶選擇自己要下載的 tag
        const {tag} = await inquirer.prompt({
            name: 'tag',
            type: 'list',
            choices: tagsList,
            message: 'Place choose a tag to create project'
        })

        // 3. 選擇的 tag
        return tag;
    }

    this.download = async function (repo, tag) {
        const requestUrl = `gun-cli/${repo}${tag ? '#' + tag : ''}`;

        await getLoading(
            this.downloadGitRepo, // 下載 Git 倉庫
            'waiting download template', // loading message
            requestUrl, // 1. 下載的 url
            path.resolve(process.cwd(), this.targetDir) // 2: 要建立的路徑
        )
    }

    // 真正建立的核心邏輯
     this.create = async function () {
         // 1. 確定要建立的 git repo
        const repo = await this.getRepo();

         // 2. 確定要建立的 git tag (version)
        const tag = await this.getTag(repo);

         // 3. 開啟正式下載
        await this.download(repo, tag);

        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
        console.log('  npm run dev\r\n');
    }
}

module.exports = Generator;
