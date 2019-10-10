import axios from 'axios';

class GroupService {

    _api = process.env.REACT_APP_API;    

    async getAll() {
        try {
            const tablets = await axios.get(this._api + '/api/tablets/');
            return tablets.data;
        } catch(e) {
            console.error(e);
            return e;
        }        
    }

    async getById(tablet) {
        try {
            const t = await axios.get(this._api + '/api/tablet/' + tablet._id);
            return t;
        } catch(e) {
            console.error(e);
            return e;
        }    
    }

    async create(tablet) {
        try {
            const res = await axios.post(this._api + '/api/tablet/', {tablet});
            return res;
        } catch(e) {
            console.error(e);
            return e;
        }   
    }

    async update(tablet) {
        try {
            const res = await axios.put(this._api + '/api/tablet/', {tablet});
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async delete(tablet) {
        try {
            const res = await axios.delete(this._api + '/api/tablet/', {tablet});
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }
    

}

export default GroupService;
