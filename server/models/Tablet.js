const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabletSchema = new Schema({
    name: String,
    model: String,
    ip: String,
    group: Number,
    groupObj : {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
});

module.exports = mongoose.model('Tablet', TabletSchema);