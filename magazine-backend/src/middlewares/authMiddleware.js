const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure the token is retrieved from cookies

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, 'magazine');
        req.user = await User.findById(decoded.id).select('-password'); // Attach user to req

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = protect;
