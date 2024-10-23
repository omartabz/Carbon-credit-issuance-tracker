const express = require('express');
const router = express.Router();

router.post('/transactions', (req, res) => {
    const { amount, userId } = req.body;

    // fraud detection logic 
    let alerts = [];
    if (amount > 10000) {
        alerts.push({ message: "High transaction amount", severity: "high" });
    } else {
        alerts.push({ message: "Transaction seems normal", severity: "low" });
    }

    res.status(200).json({ alerts });
});

module.exports = router;
