const initConfig = require('./util/config');
const createServer = require('./util/server');

async function init() {
    await initConfig();
    createServer();
}
init();