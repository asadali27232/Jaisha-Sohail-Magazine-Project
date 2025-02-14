const mongoose = require('mongoose');
const Plan = require('../models/Plan'); // Assuming the model is in 'models' directory
const connectDB = require('./db');

// Connect to MongoDB
connectDB();

const plans = [
    {
        title: 'Silver Plan',
        description: 'Basic plan which renews monthly',
        renewalPeriod: 1,
        tier: 1,
        discount: 0.0,
    },
    {
        title: 'Gold Plan',
        description: 'Standard plan which renews every 3 months',
        renewalPeriod: 3,
        tier: 2,
        discount: 0.05,
    },
    {
        title: 'Platinum Plan',
        description: 'Premium plan which renews every 6 months',
        renewalPeriod: 6,
        tier: 3,
        discount: 0.1,
    },
    {
        title: 'Diamond Plan',
        description: 'Exclusive plan which renews annually',
        renewalPeriod: 12,
        tier: 4,
        discount: 0.25,
    },
];

const seedDB = async () => {
    await Plan.deleteMany({}); // Clear old data
    await Plan.insertMany(plans);
    console.log('Plans Added!');
    mongoose.connection.close();
};

seedDB();
