const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabletSchema = new Schema({
    number: String,
    model: String,
    ip: String
});

module.exports = mongoose.model('Tablet', TabletSchema);