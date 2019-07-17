const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartBoxSchema = new Schema({
    boxNumber: Number,
    cu: String,
    partNumber: Number,
    quantity: Number,
    maxQuantity: Number,
    warning: Number,
    cimi: Number
});

module.exports = mongoose.model('PartBox', PartBoxSchema);