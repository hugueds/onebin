const axios = require('axios');

class PartNumberApi {

    // url = 'http://10.8.66.4/lts/api/lt/popid/554303';
    // url = 'http://10.8.66.4/lts/api/lt/popid/{popid}/?cimi={cimi}';
    // const tanks = data.filter(d => /^TQ/.test(d.obj)).map(t => t.obj.replace('TQ', ''));

    constructor() {
        this.url = this.url;
        this.url = process.env.LTS_API + '/lt/popid/{popid}';
    }

    async getByPopid(popid, cimi) {
        let url;
        try {
            url = this.url.replace('{popid}', popid);
            if (cimi)
                url += '/?cimi=' + cimi;
            console.log(url)
            const res = await axios.get(url);
            const data = res.data;
            return data;
        } catch (e) {
            return e;
        }

    }

    async getCimi(popid) {
        let url;
        try {
            url = this.url.replace('{popid}', popid);
            const res = await axios.get(url);
            const cimi = res.data[0].structure;
            let data;
            switch (cimi) {
                case 'NTG':
                    data = '50491'
                    break;
                case 'BUS':
                    data = '50370'
                    break;
                case 'BUS_KD':
                    break;
                case 'NTG_KD':
                    break;
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    getByCimi() {

    }

}


module.exports = new PartNumberApi();