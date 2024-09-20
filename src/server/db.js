// db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env

// Create a connection pool with environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Pass123123@@',
    database: process.env.DB_NAME || 'tourbuzz1',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Export the pool for use in other modules
const promisePool = pool.promise();
module.exports = promisePool;
