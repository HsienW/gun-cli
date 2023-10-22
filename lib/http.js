const axios = require('axios');

axios.interceptors.response.use(res => {
    return res.data;
})

/**
 * get temp list
 * @returns Promise
 */
async function getRepoList() {
    return axios.get('https://api.github.com/orgs/gun-cli/repos');
}

/**
 * get version info
 * @param {string} repo name
 * @returns Promise
 */
async function  getTagList(repo) {
    return axios.get(`https://api.github.com/repos/gun-cli/${repo}/tags`)
}

module.exports = {
    getRepoList,
    getTagList
}
