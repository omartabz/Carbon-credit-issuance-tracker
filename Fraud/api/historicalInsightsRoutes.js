const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Endpoint to get historical fraud trends
router.get('/trends', (req, res) => {
    db.all(`SELECT * FROM historical_trends`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ trends: rows });
    });
});

module.exports = router;
