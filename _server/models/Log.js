const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    user: String,
    table: String,
    date: Date,
    message: String
});

module.exports = mongoose.model('Log', LogSchema);