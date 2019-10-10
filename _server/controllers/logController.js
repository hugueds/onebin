const Log = require('../models/Log');

exports.get = async (req,res) => {    
    try {
        const l = await Log.find({});
        return res.send(l);
    } catch (error) {
        return res.send(error);
    }
}

exports.post = (req,res) => {
    
}
