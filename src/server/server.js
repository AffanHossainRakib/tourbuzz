const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const promisePool = require('./db');

const app = express();
const port = 5001; // Port for the server

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Define routes for API endpoints

// Create User
app.post('/CreateUser', async (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    try {
        const [result] = await promisePool.query(query, [name, email, password]);
        res.status(200).json({ success: true, message: 'User created successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error inserting user.' });
    }
});

// Login
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    try {
        const [results] = await promisePool.query(query, [email, password]);
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful.' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error during login.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
