// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
require('dotenv').config(); // Load environment variables

const {
    CreateUser,
    GetUsers,
    GetUserById,
    GetUserByEmail,
    GetUsersByType,
    UpdateUser,
    DeleteUser,
    CreateTour,
    GetTours,
    GetTourById,
    GetToursByStatus,
    GetToursWithGuideInfo,
    UpdateTour,
    DeleteTour,
    CreateTourGuide,
    GetTourGuides,
    GetTourGuideById,
    UpdateTourGuide,
    DeleteTourGuide,
    CreateTourBooking,
    GetTourBookings,
    GetTourBookingById,
    GetBookingsByUserId,
    GetBookingsByTourId,
    UpdateTourBooking,
    DeleteTourBooking,
    CreatePayment,
    GetPayments,
    GetPaymentById,
    GetPaymentsByBookingId,
    UpdatePayment,
    DeletePayment,
    LogAdminTourCreation,
    GetAdminTourCreations,
    GetAdminTourCreationById,
    GetToursCreatedByAdmin,
    DeleteAdminTourCreation,
} = require('./dbQueries');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define routes for API endpoints

// Users
app.post('/CreateUser', async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        await CreateUser(name, email, password, userType);
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

app.get('/GetUsersByType/:userType', async (req, res) => {
    const { userType } = req.params;
    try {
        const result = await GetUsersByType(userType);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetUsersByType Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching users by type.' });
    }
});

app.post('/UpdateUser', async (req, res) => {
    const { id, name, email } = req.body;
    try {
        await UpdateUser(id, name, email);
        res.status(200).json({ success: true, message: 'User updated successfully.' });
    } catch (err) {
        console.error('UpdateUser Error:', err);
        res.status(500).json({ success: false, message: 'Error updating user.' });
    }
});

app.delete('/DeleteUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteUser(id);
        res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (err) {
        console.error('DeleteUser Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting user.' });
    }
});

// Login
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await GetUserByEmail(email);
        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ 
                    success: true, 
                    message: 'Login successful.',
                    user_type: user.user_type 
                });
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

// Tours
app.post('/CreateTour', async (req, res) => {
    const { title, description, location, price, availableSeats, startDate, endDate, imageUrl, guideId, featured, status } = req.body;
    try {
        await CreateTour(title, description, location, price, availableSeats, startDate, endDate, imageUrl, guideId, featured, status);
        res.status(200).json({ success: true, message: 'Tour created successfully.' });
    } catch (err) {
        console.error('CreateTour Error:', err);
        res.status(500).json({ success: false, message: 'Error creating tour.' });
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

app.get('/GetTourById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetTourById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTourById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour.' });
    }
});

app.get('/GetToursByStatus/:status', async (req, res) => {
    const { status } = req.params;
    try {
        const result = await GetToursByStatus(status);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetToursByStatus Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tours by status.' });
    }
});

app.get('/GetToursWithGuideInfo', async (req, res) => {
    try {
        const result = await GetToursWithGuideInfo();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetToursWithGuideInfo Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tours with guide info.' });
    }
});

app.post('/UpdateTour', async (req, res) => {
    const { id, title, description, price } = req.body;
    try {
        await UpdateTour(id, title, description, price);
        res.status(200).json({ success: true, message: 'Tour updated successfully.' });
    } catch (err) {
        console.error('UpdateTour Error:', err);
        res.status(500).json({ success: false, message: 'Error updating tour.' });
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

// Tour Guides
app.post('/CreateTourGuide', async (req, res) => {
    const { name, email, phoneNumber, experienceYears, availabilityStatus } = req.body;
    try {
        await CreateTourGuide(name, email, phoneNumber, experienceYears, availabilityStatus);
        res.status(200).json({ success: true, message: 'Tour guide created successfully.' });
    } catch (err) {
        console.error('CreateTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error creating tour guide.' });
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
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTourGuideById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour guide.' });
    }
});

app.post('/UpdateTourGuide', async (req, res) => {
    const { id, name, email } = req.body;
    try {
        await UpdateTourGuide(id, name, email);
        res.status(200).json({ success: true, message: 'Tour guide updated successfully.' });
    } catch (err) {
        console.error('UpdateTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error updating tour guide.' });
    }
});

app.delete('/DeleteTourGuide/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteTourGuide(id);
        res.status(200).json({ success: true, message: 'Tour guide deleted successfully.' });
    } catch (err) {
        console.error('DeleteTourGuide Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting tour guide.' });
    }
});

// Tour Bookings
app.post('/CreateTourBooking', async (req, res) => {
    const { userId, tourId, seatsBooked } = req.body;
    try {
        await CreateTourBooking(userId, tourId, seatsBooked);
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

app.get('/GetTourBookingById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetTourBookingById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetTourBookingById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tour booking.' });
    }
});

app.get('/GetBookingsByUserId/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await GetBookingsByUserId(userId);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetBookingsByUserId Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching bookings by user ID.' });
    }
});

app.get('/GetBookingsByTourId/:tourId', async (req, res) => {
    const { tourId } = req.params;
    try {
        const result = await GetBookingsByTourId(tourId);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetBookingsByTourId Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching bookings by tour ID.' });
    }
});

app.post('/UpdateTourBooking', async (req, res) => {
    const { id, seatsBooked } = req.body;
    try {
        await UpdateTourBooking(id, seatsBooked);
        res.status(200).json({ success: true, message: 'Tour booking updated successfully.' });
    } catch (err) {
        console.error('UpdateTourBooking Error:', err);
        res.status(500).json({ success: false, message: 'Error updating tour booking.' });
    }
});

app.delete('/DeleteTourBooking/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteTourBooking(id);
        res.status(200).json({ success: true, message: 'Tour booking deleted successfully.' });
    } catch (err) {
        console.error('DeleteTourBooking Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting tour booking.' });
    }
});

// Payments
app.post('/CreatePayment', async (req, res) => {
    const { bookingId, amount, paymentStatus } = req.body;
    try {
        await CreatePayment(bookingId, amount, paymentStatus);
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

app.get('/GetPaymentById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetPaymentById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetPaymentById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching payment.' });
    }
});

app.get('/GetPaymentsByBookingId/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const result = await GetPaymentsByBookingId(bookingId);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetPaymentsByBookingId Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching payments by booking ID.' });
    }
});

app.post('/UpdatePayment', async (req, res) => {
    const { id, paymentStatus } = req.body;
    try {
        await UpdatePayment(id, paymentStatus);
        res.status(200).json({ success: true, message: 'Payment updated successfully.' });
    } catch (err) {
        console.error('UpdatePayment Error:', err);
        res.status(500).json({ success: false, message: 'Error updating payment.' });
    }
});

app.delete('/DeletePayment/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeletePayment(id);
        res.status(200).json({ success: true, message: 'Payment deleted successfully.' });
    } catch (err) {
        console.error('DeletePayment Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting payment.' });
    }
});

// Admin Tour Creation Log
app.post('/LogAdminTourCreation', async (req, res) => {
    const { adminId, tourId } = req.body;
    try {
        await LogAdminTourCreation(adminId, tourId);
        res.status(200).json({ success: true, message: 'Admin tour creation logged successfully.' });
    } catch (err) {
        console.error('LogAdminTourCreation Error:', err);
        res.status(500).json({ success: false, message: 'Error logging admin tour creation.' });
    }
});

app.get('/GetAdminTourCreations', async (req, res) => {
    try {
        const result = await GetAdminTourCreations();
        res.status(200).json(result);
    } catch (err) {
        console.error('GetAdminTourCreations Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching admin tour creations.' });
    }
});

app.get('/GetAdminTourCreationById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GetAdminTourCreationById(id);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetAdminTourCreationById Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching admin tour creation.' });
    }
});

app.get('/GetToursCreatedByAdmin/:adminId', async (req, res) => {
    const { adminId } = req.params;
    try {
        const result = await GetToursCreatedByAdmin(adminId);
        res.status(200).json(result);
    } catch (err) {
        console.error('GetToursCreatedByAdmin Error:', err);
        res.status(500).json({ success: false, message: 'Error fetching tours created by admin.' });
    }
});

app.delete('/DeleteAdminTourCreation/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DeleteAdminTourCreation(id);
        res.status(200).json({ success: true, message: 'Admin tour creation deleted successfully.' });
    } catch (err) {
        console.error('DeleteAdminTourCreation Error:', err);
        res.status(500).json({ success: false, message: 'Error deleting admin tour creation.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
