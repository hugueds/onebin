import axios from 'axios';

class OneBinService {    

    constructor(endpoint, api) {         
        this.endpoint = endpoint;        
        if (api)
            this.api = api;
        else
            this.api = process.env.REACT_APP_API;
        this.api += `/api/${endpoint}/`;
    }    
    
    async getAll() {
        try {
            const res = await axios.get(this.api);
            return res.data;
        } catch(e) {
            console.error( e);
            return e;
        }        
    }

    async getById(obj) {
        try {
            const t = await axios.get(this.api + obj._id);
            return t;
        } catch(e) {
            console.error(e);
            return e;
        }    
    }

    async create(obj) {        
        try {
            const res = await axios.post(this.api, { [this.endpoint]: obj });
            return res;
        } catch(e) {
            console.error(e);
            return e;
        }   
    }

    async update(obj) {
        try {
            const res = await axios.put(this.api,  { [this.endpoint]: obj });
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async delete(obj) {
        console.log(obj)
        try {            
            const res = await axios.delete(this.api + obj._id);
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }
    
    

}

export default OneBinService