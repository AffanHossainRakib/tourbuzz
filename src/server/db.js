const mysql = require('mysql2');

// Create a connection pool with direct credentials
const pool = mysql.createPool({
    host: '127.0.0.1',       // Correct MySQL host
    port: 3306,              // MySQL default port
    user: 'root',            // Replace with your MySQL username
    password: 'Pass123123@@', // Replace with your MySQL password
    database: 'tourbuzz1',   // Replace with your database name
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Export the pool for use in other modules
const promisePool = pool.promise();
module.exports = promisePool;
