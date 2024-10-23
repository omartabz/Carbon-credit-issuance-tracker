const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Endpoint to get transaction details by ID
router.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

module.exports = router;
