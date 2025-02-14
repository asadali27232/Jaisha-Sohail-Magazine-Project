const mongoose = require('mongoose');

// Define Plan Schema
const planSchema = new mongoose.Schema({
    title: String,
    description: String,
    renewalPeriod: Number,
    tier: Number,
    discount: Number,
});

const Plan = mongoose.model('plans', planSchema);
module.exports = Plan;
