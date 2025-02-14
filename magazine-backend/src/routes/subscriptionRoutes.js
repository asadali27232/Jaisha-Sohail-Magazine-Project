const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {
    getUserSubscriptions,
    subscribeToMagazine,
    cancelSubscription,
} = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/getUserSubscriptions', protect, getUserSubscriptions);
router.post('/subscribe', protect, subscribeToMagazine);
router.put('/cancel/:subscriptionId', cancelSubscription);

module.exports = router;
