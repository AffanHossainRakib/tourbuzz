const mysql = require('mysql2');

// Create a connection pool with direct credentials
const pool = mysql.createPool({
    host: 'localhost',         // Replace with your MySQL host
    user: 'root',              // Replace with your MySQL username
    password: 'password',      // Replace with your MySQL password
    database: 'tour_db',       // Replace with your database name
    waitForConnections: true,  // Whether the pool should queue connection requests
    connectionLimit: 100,      // Maximum number of connections in the pool
    queueLimit: 0              // Maximum number of connection requests the pool will queue (0 means no limit)
});

// Export the pool for use in other modules
const promisePool = pool.promise();
module.exports = promisePool;
