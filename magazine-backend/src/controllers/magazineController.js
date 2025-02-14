const Magazine = require('../models/Magazine');

// ✅ Get all magazines
const getAllMagazines = async (req, res) => {
    try {
        const magazines = await Magazine.find();
        res.json(magazines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching magazines', error });
    }
};

// ✅ Get a single magazine by ID
const getMagazineById = async (req, res) => {
    try {
        const magazine = await Magazine.findById(req.params.id);
        if (!magazine)
            return res.status(404).json({ message: 'Magazine not found' });

        res.json(magazine);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching magazine', error });
    }
};

module.exports = { getAllMagazines, getMagazineById };
