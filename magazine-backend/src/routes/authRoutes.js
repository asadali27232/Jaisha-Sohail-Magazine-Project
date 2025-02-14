const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, 'magazine', { expiresIn: '7d' });
};

// ✅ Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// ✅ Login API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        // ✅ Set Secure Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Change to true if using HTTPS
            sameSite: 'Lax',
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Login error', error });
    }
});

// ✅ Reset Password (Only for Logged-in Users)
router.post('/reset-password', protect, async (req, res) => {
    try {
        const { newPassword } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
});

// ✅ Get User Profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
});

// ✅ Logout User
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out' });
});

module.exports = router;
