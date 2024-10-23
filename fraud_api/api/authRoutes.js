const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcrypt');

// Endpoint for user registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ userId: this.lastID });
        });
    });
});

// Endpoint for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare the password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
            res.json({ userId: user.id });
        });
    });
});

module.exports = router;
