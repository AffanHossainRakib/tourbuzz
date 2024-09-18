const promisePool = require('./db');
const bcrypt = require('bcrypt');

// Helper function to execute queries
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

const CreateUser = async (name, email, password, user_type = 'user') => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const query = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
        return await executeQuery(query, [name, email, hashedPassword, user_type]);
    } catch (err) {
        console.error('Error in CreateUser:', err);
        throw err;
    }
};

const GetUsers = () => {
    const query = `SELECT * FROM users`;
    return executeQuery(query);
};

const GetUserByEmail = (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    return executeQuery(query, [email]);
};

const GetUserById = (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    return executeQuery(query, [id]);
};

const DeleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return executeQuery(query, [id]);
};


// Tours CRUD Operations

const CreateTour = async (
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
    status = 'available'
) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        const tourQuery = `
            INSERT INTO tours (title, description, location, price, available_seats, start_date, end_date, image_url, guide_id, featured, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.query(tourQuery, [
            title,
            description,
            location,
            price,
            available_seats,
            start_date,
            end_date,
            image_url,
            guide_id,
            featured ? 1 : 0,
            status
        ]);

        if (guide_id) {
            const guideQuery = `UPDATE tour_guides SET availability_status = 'unavailable' WHERE id = ?`;
            await connection.query(guideQuery, [guide_id]);
        }

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        console.error('Error creating tour:', err);
        throw err;
    } finally {
        connection.release();
    }
};

const UpdateTour = async (
    id,
    title,
    description,
    price,
    available_seats,
    start_date,
    end_date,
    image_url,
    guide_id,
    featured,
    status,
    previous_guide_id
) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        // Ensure the date is stored correctly as only YYYY-MM-DD
        const formattedStartDate = start_date.split('T')[0];  // Extract only the date part
        const formattedEndDate = end_date.split('T')[0];      // Extract only the date part

        const tourQuery = `
            UPDATE tours 
            SET title = ?, description = ?, price = ?, available_seats = ?, start_date = ?, end_date = ?, image_url = ?, guide_id = ?, featured = ?, status = ? 
            WHERE id = ?`;
        await connection.query(tourQuery, [title, description, price, available_seats, formattedStartDate, formattedEndDate, image_url, guide_id, featured, status, id]);

        // Handle guide availability updates
        if (previous_guide_id && previous_guide_id !== guide_id) {
            // Make the previous guide available
            const previousGuideQuery = `UPDATE tour_guides SET availability_status = 'available' WHERE id = ?`;
            await connection.query(previousGuideQuery, [previous_guide_id]);

            // Make the new guide unavailable
            const newGuideQuery = `UPDATE tour_guides SET availability_status = 'unavailable' WHERE id = ?`;
            await connection.query(newGuideQuery, [guide_id]);
        } else if (!previous_guide_id && guide_id) {
            // If no previous guide, but a new guide is assigned, mark them as unavailable
            const newGuideQuery = `UPDATE tour_guides SET availability_status = 'unavailable' WHERE id = ?`;
            await connection.query(newGuideQuery, [guide_id]);
        }

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        console.error('Error updating tour:', err);
        throw err;
    } finally {
        connection.release();
    }
};

const GetBookingsByTourId = (tourId) => {
    const query = `
        SELECT tb.*, u.name AS user_name, u.email
        FROM tour_bookings tb
        JOIN users u ON tb.user_id = u.id
        WHERE tb.tour_id = ?
    `;
    return executeQuery(query, [tourId]);
};



// Get all tours
const GetTours = async () => {
    const query = `SELECT * FROM tours`;
    try {
        const [results] = await promisePool.query(query);
        return results;
    } catch (err) {
        console.error('Error fetching tours:', err);
        throw err;
    }
};

// dbQueries.js

const DeleteTour = async (id) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        // SQL query to delete the tour from the 'tours' table
        const deleteTourQuery = `DELETE FROM tours WHERE id = ?`;
        await connection.query(deleteTourQuery, [id]);

        // Commit the transaction
        await connection.commit();
    } catch (err) {
        await connection.rollback(); // Rollback the transaction on error
        console.error('Error deleting tour:', err);
        throw err;
    } finally {
        connection.release(); // Release the database connection
    }
};





// Tour Guide CRUD Operations

const CreateTourGuide = (name, email, phone_number, experience_years, availability_status = 'available') => {
    const query = `INSERT INTO tour_guides (name, email, phone_number, experience_years, availability_status) VALUES (?, ?, ?, ?, ?)`;
    return executeQuery(query, [name, email, phone_number, experience_years, availability_status]);
};

const DeleteTourGuide = async (id) => {
    const query = `DELETE FROM tour_guides WHERE id = ?`;
    return executeQuery(query, [id]);
};


const UpdateTourGuide = (id, name, email, phone_number, experience_years, availability_status) => {
    const query = `
        UPDATE tour_guides
        SET name = ?, email = ?, phone_number = ?, experience_years = ?, availability_status = ?
        WHERE id = ?
    `;
    return executeQuery(query, [name, email, phone_number, experience_years, availability_status, id]);
};


const GetTourGuides = () => {
    const query = `SELECT * FROM tour_guides`;
    return executeQuery(query);
};

const GetTourGuideById = async (id) => {
    const query = `SELECT * FROM tour_guides WHERE id = ?`;
    return executeQuery(query, [id]);
};


// Tour Bookings CRUD Operations

const CreateTourBooking = (user_id, tour_id, seats_booked) => {
    const query = `INSERT INTO tour_bookings (user_id, tour_id, seats_booked) VALUES (?, ?, ?)`;
    return executeQuery(query, [user_id, tour_id, seats_booked]);
};

// Payments CRUD Operations

const CreatePayment = (booking_id, amount, payment_status) => {
    const query = `INSERT INTO payments (booking_id, amount, payment_status) VALUES (?, ?, ?)`;
    return executeQuery(query, [booking_id, amount, payment_status]);
};

// Admin Tour Creation Log

const LogAdminTourCreation = (admin_id, tour_id) => {
    const query = `INSERT INTO admin_tour_creations (admin_id, tour_id) VALUES (?, ?)`;
    return executeQuery(query, [admin_id, tour_id]);
};

const DeleteMedia = async (fileName) => {
    try {
        const filePath = path.join(__dirname, 'public/assets/tours', fileName);

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            return { success: true, message: 'Media file deleted successfully.' };
        } else {
            return { success: false, message: 'File not found.' };
        }
    } catch (error) {
        console.error('DeleteMedia Error:', error);
        return { success: false, message: 'Error deleting media file.' };
    }
};




const UploadMedia = async (files) => {
    try {
        if (!files || Object.keys(files).length === 0) {
            throw new Error('No files uploaded');
        }

        // Iterate over the uploaded files and save each one
        Object.keys(files).forEach(async (key) => {
            const file = files[key];
            const uploadPath = path.join(__dirname, 'public/assets/tours', file.name);

            // Move file to the specified folder
            await file.mv(uploadPath, (err) => {
                if (err) {
                    console.error('UploadMedia Error:', err);
                    throw new Error('Error uploading file');
                }
            });
        });

        return { success: true, message: 'Files uploaded successfully.' };
    } catch (error) {
        console.error('UploadMedia Error:', error);
        throw new Error('Error uploading media.');
    }
};



// Exporting functions

module.exports = {
    CreateUser,
    GetUsers,
    GetUserById,
    GetUserByEmail,
    CreateTour,
    UpdateTour,
    GetTourGuides,
    CreateTourGuide,
    CreateTourBooking,
    CreatePayment,
    LogAdminTourCreation,
    GetTours,
    GetTourGuideById,
    DeleteTour,
    UpdateTourGuide,
    DeleteTourGuide,
    DeleteUser,
    UploadMedia,
    DeleteMedia,
    GetBookingsByTourId,
};
