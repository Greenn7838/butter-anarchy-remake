const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { type: String, required: true },
    money: { type: Number, default: 100 }
});

module.exports = mongoose.model('economy', schema);