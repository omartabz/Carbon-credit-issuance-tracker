const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/fraud-detection.db');

// Initialize the database by executing the SQL schema
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        amount REAL NOT NULL,
        transactionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS fraud_alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transactionId INTEGER,
        message TEXT NOT NULL,
        severity TEXT NOT NULL,
        alertDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (transactionId) REFERENCES transactions(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS verification_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transactionId INTEGER,
        reason TEXT NOT NULL,
        requestDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'Pending',
        FOREIGN KEY (transactionId) REFERENCES transactions(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS historical_trends (
        year INTEGER PRIMARY KEY,
        fraudCount INTEGER NOT NULL
    )`);
});

module.exports = db;
