module.exports = async (opts, createRequest) => {
    const data = {
        username: 'MzEwMjcwYmY0Y2Y0ODcwMzU0ZDFkZmIxMmMzMGYyMTkgVlBaanMwNmtrb1BYMGxOVzVUMUJ3Zz09'
    };

    let res = await createRequest('POST', 'https://music.163.com/api/register/anonimous', data, {crypto: 'weapi'});

    console.log(res);

    return res;
}