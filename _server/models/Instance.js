const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstanceSchema = new Schema({
    number: Number,
    name: String,
    description: String,
    boxes: []
});

module.exports = mongoose.model('Instance', InstanceSchema);