const fs = require('fs');
const path = require('path');
const createRequest = require('../util/request');

let modules = ['login'];
let obj = {};
modules.forEach((module) => {
    fs.readdirSync(path.join(__dirname, module)).forEach((file) => {
        let api = require(path.join(__dirname, module, file));
        let fn = (module + '_' + file.split('.').shift()) || '';
        obj[fn] = function (data = {}) {
            return api({
                ...data
            }, createRequest);
        };
    })
})


module.exports = {
    ...obj
}