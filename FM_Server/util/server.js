const Koa = require('koa');

const createServer = () => {
    console.log('hello world');
    const app = new Koa();

    app.listen(3000);
    console.log(`server running @ http://localhost:3000`);
};

module.exports = createServer;