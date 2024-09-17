// dbQueries.js
const promisePool = require('./db');
const bcrypt = require('bcrypt');

function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        promisePool.query(query, params)
            .then(([results]) => resolve(results))
            .catch((err) => {
                console.error(`Error executing query: ${query}`, err);
                reject(err);
            });
    });
}

// Users CRUD Operations
// dbQueries.js
const CreateUser = async (name, email, password, userType = 'user') => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
        return await executeQuery(query, [name, email, hashedPassword, userType]);
    } catch (err) {
        console.error('Error in CreateUser:', err);
        throw err;
    }
};


const GetUsers = () => {
    const query = `SELECT * FROM users`;
    return executeQuery(query);
};

const GetUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        return await executeQuery(query, [email]);
    } catch (err) {
        console.error('Error in GetUserByEmail:', err);
        throw err;
    }
};

const GetUserById = (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    return executeQuery(query, [id]);
};

const GetUsersByType = (userType) => {
    const query = `SELECT * FROM users WHERE user_type = ?`;
    return executeQuery(query, [userType]);
};

const UpdateUser = (id, name, email) => {
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    return executeQuery(query, [name, email, id]);
};

const DeleteUser = (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Tours CRUD Operations
const CreateTour = (title, description, location, price, availableSeats, startDate, endDate, imageUrl, guideId, featured, status) => {
    const query = `INSERT INTO tours (title, description, location, price, available_seats, start_date, end_date, image_url, guide_id, featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return executeQuery(query, [title, description, location, price, availableSeats, startDate, endDate, imageUrl, guideId, featured, status]);
};

const GetTours = () => {
    const query = `SELECT * FROM tours`;
    return executeQuery(query);
};

const GetTourById = (id) => {
    const query = `SELECT * FROM tours WHERE id = ?`;
    return executeQuery(query, [id]);
};

const GetToursByStatus = (status) => {
    const query = `SELECT * FROM tours WHERE status = ?`;
    return executeQuery(query, [status]);
};

const GetToursWithGuideInfo = () => {
    const query = `SELECT t.*, tg.name AS guide_name FROM tours t LEFT JOIN tour_guides tg ON t.guide_id = tg.id`;
    return executeQuery(query);
};

const UpdateTour = (id, title, description, price) => {
    const query = `UPDATE tours SET title = ?, description = ?, price = ? WHERE id = ?`;
    return executeQuery(query, [title, description, price, id]);
};

const DeleteTour = (id) => {
    const query = `DELETE FROM tours WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Tour Guides CRUD Operations
const CreateTourGuide = (name, email, phoneNumber, experienceYears, availabilityStatus) => {
    const query = `INSERT INTO tour_guides (name, email, phone_number, experience_years, availability_status) VALUES (?, ?, ?, ?, ?)`;
    return executeQuery(query, [name, email, phoneNumber, experienceYears, availabilityStatus]);
};

const GetTourGuides = () => {
    const query = `SELECT * FROM tour_guides`;
    return executeQuery(query);
};

const GetTourGuideById = (id) => {
    const query = `SELECT * FROM tour_guides WHERE id = ?`;
    return executeQuery(query, [id]);
};

const UpdateTourGuide = (id, name, email) => {
    const query = `UPDATE tour_guides SET name = ?, email = ? WHERE id = ?`;
    return executeQuery(query, [name, email, id]);
};

const DeleteTourGuide = (id) => {
    const query = `DELETE FROM tour_guides WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Tour Bookings CRUD Operations
const CreateTourBooking = (userId, tourId, seatsBooked) => {
    const query = `INSERT INTO tour_bookings (user_id, tour_id, booking_date, seats_booked) VALUES (?, ?, NOW(), ?)`;
    return executeQuery(query, [userId, tourId, seatsBooked]);
};

const GetTourBookings = () => {
    const query = `SELECT * FROM tour_bookings`;
    return executeQuery(query);
};

const GetTourBookingById = (id) => {
    const query = `SELECT * FROM tour_bookings WHERE id = ?`;
    return executeQuery(query, [id]);
};

const GetBookingsByUserId = (userId) => {
    const query = `SELECT * FROM tour_bookings WHERE user_id = ?`;
    return executeQuery(query, [userId]);
};

const GetBookingsByTourId = (tourId) => {
    const query = `SELECT * FROM tour_bookings WHERE tour_id = ?`;
    return executeQuery(query, [tourId]);
};

const UpdateTourBooking = (id, seatsBooked) => {
    const query = `UPDATE tour_bookings SET seats_booked = ? WHERE id = ?`;
    return executeQuery(query, [seatsBooked, id]);
};

const DeleteTourBooking = (id) => {
    const query = `DELETE FROM tour_bookings WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Payments CRUD Operations
const CreatePayment = (bookingId, amount, paymentStatus) => {
    const query = `INSERT INTO payments (booking_id, amount, payment_date, payment_status) VALUES (?, ?, NOW(), ?)`;
    return executeQuery(query, [bookingId, amount, paymentStatus]);
};

const GetPayments = () => {
    const query = `SELECT * FROM payments`;
    return executeQuery(query);
};

const GetPaymentById = (id) => {
    const query = `SELECT * FROM payments WHERE id = ?`;
    return executeQuery(query, [id]);
};

const GetPaymentsByBookingId = (bookingId) => {
    const query = `SELECT * FROM payments WHERE booking_id = ?`;
    return executeQuery(query, [bookingId]);
};

const UpdatePayment = (id, paymentStatus) => {
    const query = `UPDATE payments SET payment_status = ? WHERE id = ?`;
    return executeQuery(query, [paymentStatus, id]);
};

const DeletePayment = (id) => {
    const query = `DELETE FROM payments WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Admin Tour Creation Log Operations
const LogAdminTourCreation = (adminId, tourId) => {
    const query = `INSERT INTO admin_tour_creations (admin_id, tour_id, creation_date) VALUES (?, ?, NOW())`;
    return executeQuery(query, [adminId, tourId]);
};

const GetAdminTourCreations = () => {
    const query = `SELECT * FROM admin_tour_creations`;
    return executeQuery(query);
};

const GetAdminTourCreationById = (id) => {
    const query = `SELECT * FROM admin_tour_creations WHERE id = ?`;
    return executeQuery(query, [id]);
};

const GetToursCreatedByAdmin = (adminId) => {
    const query = `SELECT * FROM admin_tour_creations WHERE admin_id = ?`;
    return executeQuery(query, [adminId]);
};

const DeleteAdminTourCreation = (id) => {
    const query = `DELETE FROM admin_tour_creations WHERE id = ?`;
    return executeQuery(query, [id]);
};

// Export all functions
module.exports = {
    executeQuery,
    CreateUser,
    GetUsers,
    GetUserById,
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
    GetUserByEmail
};
