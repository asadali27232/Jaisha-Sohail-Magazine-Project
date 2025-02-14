require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const planRoutes = require('./src/routes/planRoutes');
const magazineRoutes = require('./src/routes/magazineRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Magazine Subscription Service Running...');
});

// Define Routes
app.use('/', authRoutes);
app.use('/', magazineRoutes);
app.use('/', planRoutes);
app.use('/', subscriptionRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
