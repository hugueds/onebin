import axios from 'axios';

class InstanceService {

    _api = process.env.REACT_APP_API; 

    async getAll() {
        try {
            const instances = await axios.get(this._api + '/api/instances/');
            return instances.data;
        } catch(e) {
            console.error(e);
            return e;
        }        
    }

    async getById(instance) {
        try {
            const t = await axios.get(this._api + '/api/instance/' + instance._id);
            return t;
        } catch(e) {
            console.error(e);
            return e;
        }    
    }

    async getByGroup(group) {
        try {
            const {data} = await axios.get(this._api + '/api/group/' + group);
            return data;
        } catch(e) {
            console.error(e);
            return e;
        }    
    }

    async create(instance) {
        try {
            const res = await axios.post(this._api + '/api/instance/', {instance});
            console.log('Instance Created', res.data);
            return res;
        } catch(e) {
            console.error(e);
            return e;
        }   
    }

    async update(instance) {
        try {
            const res = await axios.put(this._api + '/api/instance/', {instance});
            console.log('Instance Updated', res.data);
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async delete(instance) {
        try {
            const res = await axios.delete(this._api + '/api/instance/', {instance});
            console.log('Instance Deleted', res.data);
            return res;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async updateBox(instanceId, box) {
        try {
            const url = this._api + '/api/instance/' + instanceId + '/updateBox';
            const res = await axios.put(url, {box});
            console.log('Instance Updated', res.data);
            return res.data;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async reloadBox(instanceId, box) {
        try {
            const url = this._api + '/api/instance/' + instanceId + '/reload';
            const res = await axios.put(url, {box});
            console.log('Instance Relodead', res.data);
            return res.data;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }

    async decrease(instanceId, box) {
        try {
            const url = this._api + '/api/instance/' + instanceId + '/decrease';
            const res = await axios.put(url, {box});
            console.log('Instance Decreased', res.data);
            return res.data;
        } catch(e) {
            console.error(e);
            return e;
        } 
    }
    

}

export default InstanceService;
