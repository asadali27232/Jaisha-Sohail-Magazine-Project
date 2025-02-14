const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    base_price: { type: Number, required: true, min: 0.01 },
});

const Magazine = mongoose.model('magazine', magazineSchema);
module.exports = Magazine;
