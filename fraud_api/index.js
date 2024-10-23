const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Import route files
const fraudDetectionRoutes = require('./api/fraudDetectionRoutes');
const transactionAnalysisRoutes = require('./api/transactionAnalysisRoutes');
const verificationRoutes = require('./api/verificationRoutes');
const historicalInsightsRoutes = require('./api/historicalInsightsRoutes');
const authRoutes = require('./api/authRoutes');

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API Routes
app.use('/api', fraudDetectionRoutes);
app.use('/api', transactionAnalysisRoutes);
app.use('/api', verificationRoutes);
app.use('/api', historicalInsightsRoutes);
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
