const fs = require('fs');
const {login_anonimous} = require('../module/import')

async function initConfig() {
    const res = await login_anonimous();
    return res;
}

module.exports = initConfig;