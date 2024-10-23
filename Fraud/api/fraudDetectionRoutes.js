const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Make sure this is the correct path to your database
const { checkFraud, fraudRules } = require("../../CarbonDatabase/public/FDDashboard");

let velocity = 0;
// Endpoint to submit a transaction (POST /api/transactions)
router.post('/transactions', (req, res) => {
    const { amount, userId } = req.body;

    //todo: work around velocity rule - short period of time
    const transaction = {
        amount, userId, timestamp: new Date()
    }
    // Database operation to insert the transaction
    db.run(`INSERT INTO transactions (userId, amount) VALUES (?, ?)`, [userId, amount], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const transactionId = this.lastID;
        // const fraudAlert = checkFraud(transaction, fraudRules) //amount > 1000 ? { message: "High transaction amount detected!", severity: "high" } : null;
        const result = checkFraud(transaction, fraudRules);
        if (result.isFraud) {
           
            // console.log(`Transaction flagged as suspicious. Violated rules: ${result.violatedRules.join(', ')}`);
            let fraudAlert = {
                message: `Transaction flagged as suspicious. Violated rules: ${result.violatedRules.join(', ')}`,
                severity: 'high'
            }
             db.run(`INSERT INTO fraud_alerts (transactionId, message, severity) VALUES (?, ?, ?)`, [transactionId, fraudAlert.message, fraudAlert.severity], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
            });
            res.json({ transactionId, alerts: [fraudAlert] });
        } else {
            console.log('Transaction is clean.');
            res.json({ transactionId, alerts: [
                {
                    message: 'Transaction is clean.',
                    severity: 'low'
                }
            ] });
        }

    });
});

module.exports = router;

