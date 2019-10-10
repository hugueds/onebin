const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    user: {
        type: String,   
        default: 'Default'
    },
    message: String,
    date: {
        type: Date,
        default: new Date()
    },
    error: Boolean
});

module.exports = mongoose.model('Log', LogSchema);