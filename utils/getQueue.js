module.exports.getQueue = async() => {
    return await new Promise((res, _) => {
        // From MoonVN
        require('axios').default.get('https://api.mcsrvstat.us/2/anarchyvn.net')
            .then((response) => {
                const data = response.data?.info?.clean;
                if (!data) return (res(-1));
                const queue = data[1].split('chờ: ')[1];
                res(+queue);
            }).catch(e => {
                log(e.message);
                res(-1);
            })
    })
}
    