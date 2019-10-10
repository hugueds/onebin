const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PartBox = require('./PartBox');


const InstanceSchema = new Schema({
    number: Number,
    name: String,
    description: String,
    boxes: [],
    __v: { type: Number, select: false },
    groups: { type: Schema.Types.ObjectId, ref: 'Group' }
});

module.exports = mongoose.model('Instance', InstanceSchema);

// boxes: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'PartBox'
    //     }
    // ],