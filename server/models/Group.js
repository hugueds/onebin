const mongoose = require('mongoose');
// const Instance = require('./Instance');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    number: Number,
    name: String,    
    instances: [{ type: Schema.Types.ObjectId, ref: 'Instance'}]
});

module.exports = mongoose.model('Group', GroupSchema);