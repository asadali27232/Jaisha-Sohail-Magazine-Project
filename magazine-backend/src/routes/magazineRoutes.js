const express = require('express');
const {
    getAllMagazines,
    getMagazineById,
} = require('../controllers/magazineController');

const router = express.Router();

// ✅ Route to get all magazines
router.get('/magazines', getAllMagazines);

// ✅ Route to get a single magazine by ID
router.get('/magazines/:id', getMagazineById);

module.exports = router;
