const axios = require('axios');

class PartNumberApi {

    // url = 'http://10.8.66.4/lts/api/lt/popid/{popid}?Cimi=';    
    url = 'http://10.8.66.4/lts/api/lt/popid/554303';

    async getByPopid(popid, cimi) {
        try {
            const res = await axios.get(this.url);
            const data = res.data;
            const tanks = data.filter(d => /^TQ/.test(d.obj)).map(t => t.obj.replace('TQ', ''));
            return tanks;
        } catch (e) {
            return 'error';
        }

    }

    getByCimi() {

    }

}


module.exports = PartNumberApi;