const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: String,
    money: { type: Number, default: 0 }
});

module.exports = mongoose.model('economy', schema, 'economysystem');