

const {weapi} = require('./crypto');
const {URLSearchParams} = require('url');
const axios = require('axios');
const http = require('http');
const https = require('https');

// 随机浏览器类型
const chooseUserAgent = (ua = 'default') => {
    const userAgentList = {
        mobile: [
            // iOS 13.5.1 14.0 beta with safari
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.',
            // iOS with qq micromsg
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML like Gecko) Mobile/14A456 QQ/6.5.7.408 V1_IPH_SQ_6.5.7_1_APP_A Pixel/750 Core/UIWebView NetType/4G Mem/103',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f27) NetType/WIFI Language/zh',
            // Android -> Huawei Xiaomi
            'Mozilla/5.0 (Linux; Android 9; PCT-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.64 HuaweiBrowser/10.0.3.311 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; U; Android 9; zh-cn; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.141 Mobile Safari/537.36 XiaoMi/MiuiBrowser/12.5.22',
            // Android + qq micromsg
            'Mozilla/5.0 (Linux; Android 10; YAL-AL00 Build/HUAWEIYAL-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2581 MMWEBSDK/200801 Mobile Safari/537.36 MMWEBID/3027 MicroMessenger/7.0.18.1740(0x27001235) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64',
            'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BKK-AL10 Build/HONORBKK-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/10.6 Mobile Safari/537.36',
        ],
        pc: [
            // macOS 10.15.6  Firefox / Chrome / Safari
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.30 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
            // Windows 10 Firefox / Chrome / Edge
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.30 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586',
            // Linux 就算了
        ]
    }
    let realUserAgentList = userAgentList[ua] || userAgentList.mobile.concat(userAgentList.pc);
    return ['mobile', 'pc', 'default'].indexOf(ua) > -1 ? realUserAgentList[Math.floor(Math.random() * realUserAgentList.length)] : ua;
}

const createRequest = (method, url, data = {}, options) => {
    return new Promise((resolve, reject) => {

        let headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN, zh; q=0.8, gl; q=0.6, zh-TW; q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Cookie': cookie,
            'Host': 'music.163.com',
            'Referer': 'https://music.163.com',
            'User-Agent': chooseUserAgent(options.ua)
        };

        data = weapi(data);
        url = url.replace(/\w*api/, 'weapi');

        let config = {
            method: method,
            url: url,
            // headers: headers,
            data: new URLSearchParams(data).toString()
        };

        axios(config).then((res) => {
            if(res.status === 200) {
                console.log(res.data);
                resolve(res.data);
            }
        }).catch((err) => {
            console.log(err);
            reject();
        });
    })
}

module.exports = createRequest;