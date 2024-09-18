import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourBookings`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                        <div>
                            <h3 className="text-xl font-bold">Booking ID: {booking.id}</h3>
                            <p>User ID: {booking.user_id}</p>
                            <p>Tour ID: {booking.tour_id}</p>
                            <p>Seats Booked: {booking.seats_booked}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewBookings;
