// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const path = require('path');
const fs = require('fs');
const promisePool = require('./db');

require('dotenv').config(); 

const {
    CreateUser,
    GetUsers,
    GetUserById,
    GetUserByEmail,
    CreateTour,
    GetTours,
    UpdateTour,
    CreateTourGuide,
    GetTourGuides,
    CreateTourBooking,
    CreatePayment,
    GetTourGuideById,
    DeleteTour,
    UpdateTourGuide,
    DeleteTourGuide,
    DeleteUser,
    GetBookingsByTourId,
    UpdateUserProfile,
    GetTourById,
    UpdateTourSeats,
    GetBookingsByUserId,
    GetTransactions,
} = require('./dbQueries');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Users Routes
app.post('/CreateUser', async (req, res) => {
    const { name, email, password, user_type } = req.body;
    try {
        await CreateUser(name, email, password, user_type);
        res.status(200).json({ success: true, message: 'User created successfully.' });
    } catch (err) {
        console.error('CreateUser Error:', err);
        res.status(500).json({ success: false, message: 'Error creating user.' });
    }
});

app.get('/GetUsers', async (req, res) => {
    try {
        const result = await GetUsers();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetUsers Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching users.' });
    }
});


// Route to fetch user profile by email
app.get('/GetUserProfile/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const users = await GetUserByEmail(email);
        if (users.length > 0) {
            res.status(200).json(users[0]);  // Return the first matching user
        } else {
            res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (err) {
        console.error('GetUserProfile Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching user profile.' });
    }
});



app.get('/GetUserById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetUserById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetUserById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching user.' });
    }
});



app.post('/UpdateUserProfile', async (req, res) => {
    const { email, newEmail, newPassword } = req.body;
    
    if (!email || (!newEmail && !newPassword)) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        const updatedFields = {};
        if (newEmail) updatedFields.email = newEmail;
        if (newPassword) updatedFields.password = await bcrypt.hash(newPassword, 10); // Hash the new password

        // Call the database query to update the user
        await UpdateUserProfile(email, updatedFields);
        
        res.status(200).json({ success: true, message: 'Profile updated successfully.' });
    } catch (err) {
        console.error('UpdateUserProfile Error:', err);
        res.status(500).json({ success: false, message: 'Error updating profile.' });
    }
});


app.post('/DeleteUser', async (req, res) => {
    const { id } = req.body;  // Assuming the user ID is sent in the request body
    try {
        await DeleteUser(id);  // Call the function to delete the user by ID
        res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (err) {
        console.error('DeleteUser Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting user.' });
    }
});


app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await GetUserByEmail(email);
        if (users.length > 0) {
            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ success: true, message: 'Login successful.', user_type: user.user_type });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials.' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Error during login.' });
    }
});

// Tours Routes
app.post('/CreateTour', async (req, res) => {
    const {
        title,
        description,
        location,
        price,
        available_seats,
        start_date,
        end_date,
        image_url,
        guide_id,
        featured,
        status
    } = req.body;

    try {
        await CreateTour(title, description, location, price, available_seats, start_date, end_date, image_url, guide_id, featured, status);
        res.status(200).json({ success: true, message: 'Tour created successfully.' });
    } catch (err) {
        console.error('CreateTour Error:', err);
        res.status(500).json({ success: false, message: 'Error creating tour.' });
    }
});

app.post('/UpdateTour', async (req, res) => {
    const {
        id,
        title,
        description,
        location,
        price,
        available_seats,
        start_date,
        end_date,
        image_url,
        guide_id,
        featured,
        status,
        previous_guide_id
    } = req.body;

    // Input validation - Ensure required fields are present
    if (!id || !title || !description || !location || !price || !available_seats || !start_date || !end_date || !guide_id || !status) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        // Call the UpdateTour function to update the tour in the database
        await UpdateTour(id, title, description, location, price, available_seats, start_date, end_date, image_url, guide_id, featured, status, previous_guide_id);

        // Send a success response
        res.status(200).json({ success: true, message: 'Tour updated successfully.' });
    } catch (err) {
        // Log the error for debugging
        console.error('UpdateTour Error:', err);

        // Send a failure response with a detailed message
        res.status(500).json({ success: false, message: 'Error updating tour. Please try again later.' });
    }
});

app.post('/UpdateTourSeats', async (req, res) => {
    const { id, available_seats, status } = req.body;

    // Input validation - Ensure required fields are present
    if (!id || available_seats === undefined || !status) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        // Call the update function to update only available_seats and status in the database
        await UpdateTourSeats(id, available_seats, status);

        // Send a success response
        res.status(200).json({ success: true, message: 'Tour seats and status updated successfully.' });
    } catch (err) {
        // Log the error for debugging
        console.error('UpdateTourSeats Error:', err);

        // Send a failure response with a detailed message
        res.status(500).json({ success: false, message: 'Error updating tour seats. Please try again later.' });
    }
});



// API Route to get all tours
app.get('/GetTours', async (req, res) => {
    try {
        const tours = await GetTours();
        res.status(200).json(tours);
    } catch (error) {
        console.error('GetTours Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching tours.' });
    }
});



app.delete('/DeleteTour/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteTour(id);
        res.status(200).json({ success: true, message: 'Tour deleted successfully.' });
    } catch (err) {
        console.error('DeleteTour Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting tour.' });
    }
});


app.get('/GetTours', async (req, res) => {
    try {
        const result = await GetTours();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTours Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tours.' });
    }
});

// Tour Guides Routes
app.post('/CreateTourGuide', async (req, res) => {
    const { name, email, phone_number, experience_years, availability_status } = req.body;
    try {
        await CreateTourGuide(name, email, phone_number, experience_years, availability_status);
        res.status(200).json({ success: true, message: 'Tour guide created successfully.' });
    } catch (err) {
        console.error('CreateTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error creating tour guide.' });
    }
});



// Endpoint to get bookings by tour ID
app.get('/GetBookingsByTourId/:id', async (req, res) => {
    const tourId = req.params.id;
    try {
        const bookings = await GetBookingsByTourId(tourId);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error fetching bookings by tour ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
});

app.post('/DeleteTourGuide', async (req, res) => {
    const { id } = req.body;  // Assuming the ID is sent in the request body
    try {
        await DeleteTourGuide(id);  // Call the function to delete the tour guide by ID
        res.status(200).json({ success: true, message: 'Tour guide deleted successfully.' });
    } catch (err) {
        console.error('DeleteTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting tour guide.' });
    }
});


app.get('/GetTourGuides', async (req, res) => {
    try {
        const result = await GetTourGuides();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTourGuides Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour guides.' });
    }
});

app.get('/GetTourGuideById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetTourGuideById(id);
        res.status(200).json(result[0]); // Send the first result
    } catch (err) {
        console.error('GetTourGuideById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour guide.' });
    }
});


// Route to get a specific tour by ID
app.get('/GetTourById/:id', async (req, res) => {
    const { id } = req.params;  // Extract tour ID from request parameters
    try {
        const tour = await GetTourById(id);  // Call the function from dbQueries.js to fetch the tour
        if (tour.length > 0) {
            res.status(200).json(tour[0]);  // Send the first result if the tour exists
        } else {
            res.status(404).json({ success: false, message: 'Tour not found' });
        }
    } catch (error) {
        console.error('Error fetching tour by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching tour' });
    }
});



app.post('/UpdateTourGuide', async (req, res) => {
    const { id, name, email, phone_number, experience_years, availability_status } = req.body;  // Add all fields to destructuring
    try {
        await UpdateTourGuide(id, name, email, phone_number, experience_years, availability_status);  // Pass all fields to the update function
        res.status(200).json({ success: true, message: 'Tour guide updated successfully.' });
    } catch (err) {
        console.error('UpdateTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error updating tour guide.' });
    }
});


// Tour Bookings Routes
app.post('/CreateTourBooking', async (req, res) => {
    const { user_id, tour_id, seats_booked } = req.body;
    try {
        await CreateTourBooking(user_id, tour_id, seats_booked);
        res.status(200).json({ success: true, message: 'Tour booking created successfully.' });
    } catch (err) {
        console.error('CreateTourBooking Error:', err);
        res.status(500).json({ success: false, message: 'Error creating tour booking.' });
    }
});

app.get('/GetTourBookings', async (req, res) => {
    try {
        const result = await GetTourBookings();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTourBookings Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour bookings.' });
    }
});

app.get('/GetBookingsByUserId/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await GetBookingsByUserId(user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetBookingsByUserId Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching bookings by user ID.' });
    }
});

// Payments Routes
app.post('/CreatePayment', async (req, res) => {
    const { booking_id, amount, payment_status } = req.body;
    try {
        await CreatePayment(booking_id, amount, payment_status);
        res.status(200).json({ success: true, message: 'Payment created successfully.' });
    } catch (err) {
        console.error('CreatePayment Error:', err);
        res.status(500).json({ success: false, message: 'Error creating payment.' });
    }
});

app.get('/GetPayments', async (req, res) => {
    try {
        const result = await GetPayments();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetPayments Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching payments.' });
    }
});

app.get('/GetMediaFiles', (req, res) => {
    const mediaDir = path.resolve( '../../public/assets/tours'); // Adjusting path to point outside src/server

    fs.readdir(mediaDir, (err, files) => {
        if (err) {
            console.error('Error reading media files:', err);
            return res.status(500).json({ success: false, message: 'Error reading media files.' });
        }
        res.status(200).json({ success: true, files });
    });
});



app.post('/UploadMedia', async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }

        const uploadedFiles = req.files;
        Object.keys(uploadedFiles).forEach((key) => {
            const file = uploadedFiles[key];
            const uploadPath = path.join(__dirname, 'public/assets/tours', file.name);

            // Save file to the server
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error('UploadMedia Error:', err);
                    return res.status(500).json({ success: false, message: 'Error uploading file.' });
                }
            });
        });

        res.status(200).json({ success: true, message: 'Files uploaded successfully.' });
    } catch (err) {
        console.error('UploadMedia Error:', err);
        res.status(500).json({ success: false, message: 'Error uploading media.' });
    }
});

app.post('/DeleteMedia', async (req, res) => {
    const { fileName } = req.body;
    const filePath = path.join(__dirname, 'public/assets/tours', fileName);

    try {
        // Delete the file from the server
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ success: true, message: 'Media file deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'File not found.' });
        }
    } catch (err) {
        console.error('DeleteMedia Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting media file.' });
    }
});

app.post('/CompletePayment', async (req, res) => {
    const { email, tour_id, seats_booked } = req.body;

    if (!email || !tour_id || !seats_booked) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        // Step 1: Fetch user ID by email
        const [userResult] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const user_id = userResult[0].id;

        // Step 2: Fetch tour price by tour_id
        const [tourResult] = await connection.query('SELECT price FROM tours WHERE id = ?', [tour_id]);
        if (tourResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Tour not found.' });
        }
        const tour_price = tourResult[0].price;

        // Calculate the total price based on seats_booked
        const total_price = tour_price * seats_booked;

        // Step 3: Insert into tour_bookings
        const bookingQuery = `
            INSERT INTO tour_bookings (user_id, tour_id, seats_booked)
            VALUES (?, ?, ?)
        `;
        const [bookingResult] = await connection.query(bookingQuery, [user_id, tour_id, seats_booked]);
        const booking_id = bookingResult.insertId; // Get the inserted booking ID

        // Step 4: Insert into payments table
        const paymentQuery = `
            INSERT INTO payments (booking_id, amount, payment_status)
            VALUES (?, ?, 'completed')
        `;
        await connection.query(paymentQuery, [booking_id, total_price]);

        // Commit the transaction
        await connection.commit();

        // Send success response
        res.status(200).json({ success: true, message: 'Payment and booking completed successfully.', total_price });
    } catch (err) {
        await connection.rollback();
        console.error('CompletePayment Error:', err);
        res.status(500).json({ success: false, message: 'Error processing payment and booking.' });
    } finally {
        connection.release();
    }
});

app.get('/GetBookingsByUserId/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await GetBookingsByUserId(user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetBookingsByUserId Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching bookings by user ID.' });
    }
});


app.get('/GetTransactions', async (req, res) => {
    try {
        const transactions = await GetTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ success: false, message: 'Error fetching transactions' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});








