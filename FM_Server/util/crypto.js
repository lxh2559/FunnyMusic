const crypto = require('crypto');

const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const presetKey = Buffer.from('0CoJUm6Qyw8W8jud');
const iv = Buffer.from('0102030405060708'); // 初始化向量，为随机字符串
const publicKey = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----';

const aseEncrypt = (buffer, algorithm, key, iv) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

const rsaEncrypt = (buffer, key) => {
    buffer = Buffer.concat([Buffer.alloc(128 - buffer.length), buffer]);
    return crypto.publicEncrypt({
        key: key,
        padding: crypto.constants.RSA_NO_PADDING
    }, buffer);
}

const weapi = (object) => {
    const text = JSON.stringify(object);
    const secretKey = crypto.randomBytes(16).map((n) => base62.charAt(n % 62).charCodeAt());

    return {
        params:aseEncrypt(
            Buffer.from(aseEncrypt(Buffer.from(text), 'aes-128-cbc', presetKey, iv).toString('base64')),
            'aes-128-cbc',
            secretKey,
            iv
        ).toString('base64'),
        encSecKey: rsaEncrypt(secretKey.reverse(), publicKey).toString('hex')
    }
}

module.exports = {
    weapi
}