const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartBoxSchema = new Schema({    
    boxNumber: Number,
    order: Number,
    currentOrder: {
        type: Boolean,
        default: 0
    },
    partNumber: Number,
    quantity: Number,
    maxQuantity: Number,
    warning: Number,
    danger: Number,
    instance: { type: Schema.Types.ObjectId, ref: 'Instance' }
});

module.exports = mongoose.model('PartBox', PartBoxSchema);