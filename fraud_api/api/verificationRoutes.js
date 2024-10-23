const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Endpoint to request verification for a transaction
router.post('/verify', (req, res) => {
    const { transactionId, reason } = req.body;

    db.run(`INSERT INTO verification_requests (transactionId, reason) VALUES (?, ?)`, [transactionId, reason], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ verificationId: this.lastID, status: 'Pending' });
    });
});

module.exports = router;
