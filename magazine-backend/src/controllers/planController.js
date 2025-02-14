const Plan = require('../models/Plan');

// ✅ Get all plans
const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plans', error });
    }
};

module.exports = { getAllPlans };
