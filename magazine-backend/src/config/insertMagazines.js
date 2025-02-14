const mongoose = require('mongoose');
const Magazine = require('../models/Magazine');
const connectDB = require('./db');

// Connect to MongoDB
connectDB();

const magazines = [
    {
        name: 'Tech Today',
        description: 'Latest trends in technology',
        base_price: 10,
    },
    {
        name: 'Health & Wellness',
        description: 'Tips for a healthy lifestyle',
        base_price: 12,
    },
    {
        name: 'Business Insights',
        description: 'Market analysis and finance tips',
        base_price: 15,
    },
    {
        name: 'Science Weekly',
        description: 'Breakthroughs in science and research',
        base_price: 11,
    },
    {
        name: 'Sports Digest',
        description: 'Latest sports news and events',
        base_price: 9,
    },
    {
        name: 'Entertainment Buzz',
        description: 'Celebrity news and movie updates',
        base_price: 14,
    },
    {
        name: 'Food & Recipes',
        description: 'Delicious recipes and cooking tips',
        base_price: 8,
    },
    {
        name: 'Travel Explorer',
        description: 'Discover new destinations',
        base_price: 13,
    },
    {
        name: 'Home & Living',
        description: 'Interior design and home improvement ideas',
        base_price: 10,
    },
    {
        name: 'History Chronicles',
        description: 'Explore historical events',
        base_price: 7,
    },
];

const seedDB = async () => {
    await Magazine.deleteMany({}); // Clear old data
    await Magazine.insertMany(magazines);
    console.log('10 Magazines Added!');
    mongoose.connection.close();
};

seedDB();
