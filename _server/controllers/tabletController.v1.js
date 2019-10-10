const mongoose = require('mongoose');
const Tablet = require('../models/Tablet');
const Log = require('../models/Log');

exports.get = async (req, res) => {
    try {
        const tablet = await Tablet.find();
        return res.send(tablet);
    } catch (error) {        
        console.error(error);
        return res.send(error);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;
    const log = new Log();
    try {
        const tablet = await Tablet.findById(id);
        return res.send(tablet);
    } catch (error) {
        log.error = true;
        await log.save();
        console.error(error);
        return res.send(error);
    }
};

exports.post = async (req, res, next) => {
    const tablet = new Tablet(req.body.tablet);
    const log = new Log();

    try {
        const r = await Tablet.collection.insertOne(tablet);
        console.log('Tablet Created');
        return res.send(r);
    } catch (error) {
        log.error = true;
        await log.save();
        console.error(error);
        return res.send(error);
    }

};

exports.put = async (req, res, next) => {
    const { tablet } = req.body;
    const log = new Log();
    if (mongoose.Types.ObjectId.isValid(tablet._id)) {
        try {
            const t = await Tablet.findByIdAndUpdate(tablet._id, tablet, { new: true, upsert: true, useFindAndModify: false });
            return res.send(t);
        } catch (error) {
            log.error = true;
        await log.save();
            console.error(error);
            return res.send(error);
        }
    }
    else {
        log.error = true;
        await log.save();
        console.error('ID NOT FOUND');
        return res.send('ID NOT FOUND');
    }
};

exports.delete = async (req, res, next) => {    
    const {id} = req.params;
    const log = new Log();
    try {
        const t = await Tablet.findByIdAndDelete(id);
        console.log('Tablet ID ' + id + ' Deleted');
        log.message = 'Tablet ID ' + id + ' Deleted';
        await log.save();
        return res.send(t);
    } catch (error) {
        log.error = true;
        await log.save();
        console.error(error);
        return res.send(error);
    }
};
