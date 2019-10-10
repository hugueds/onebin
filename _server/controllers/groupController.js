const mongoose = require('mongoose');
const Group = require('../models/Group');

exports.get = async (req, res, next) => {
    try {
        const data = await Group.find({});
        return res.send(data);
    } catch (e) {
        return res.send(e);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Group.findOne({ number: id }).populate('instances')
        return res.send(data);
    } catch (e) {
        return res.send(e)
    }
};

exports.post = async (req, res, next) => {
    const group = new Group(req.body.group);
    try {
        const data = await Group.collection.insertOne(group);
        return res.send(data);
    } catch (e) {
        return res.send(e);
    }
};

exports.put = async (req, res, next) => {
    const { group } = req.body;
    if (mongoose.Types.ObjectId.isValid(group._id)) {
        try {
            const id = group._id;
            delete group._id;
            const data = await Group.findByIdAndUpdate(id, group, { new: true, upsert: true, useFindAndModify: false });
            return res.send(data);
        } catch (e) {
            return res.send(e);
        }
    }
    else {
        return res.send('ID NOT FOUND');
    }
};

exports.delete = async (req, res, next) => {
    const { group } = req.body;
    try {
        const id = group._id;
        delete group._id;
        const data = await Group.remove({_id: id});
        return res.send(data);
    }
    catch (err) {
        return res.send(err);
    }
};
