import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBookings = () => {
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchTours();
    }, []);

    useEffect(() => {
        setFilteredTours(
            tours.filter(tour =>
                tour.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, tours]);

    const fetchTours = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTours`);
            setTours(response.data);
            setFilteredTours(response.data); // Initialize filtered tours
            setError(null);
        } catch (error) {
            console.error('Error fetching tours:', error);
            setError('Failed to fetch tours');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTourClick = (tour) => {
        setSelectedTour(tour);
        setShowBookings(false);
        setBookingDetails([]);  // Clear previous bookings
    };

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetBookingsByTourId/${selectedTour.id}`);
            setBookingDetails(response.data || []);
            setShowBookings(true);
            setError(null);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to fetch bookings for the selected tour');
            setShowBookings(false);
        } finally {
            setIsLoading(false);
        }
    };

    const closeOverlay = () => {
        setSelectedTour(null);
        setShowBookings(false);
    };

    return (
        <div className="px-4 py-2">
            <h2 className="text-2xl font-bold mb-4">View Bookings</h2>
            <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded-lg shadow-sm"
            />
            {error && <p className="text-red-500">{error}</p>}
            {isLoading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTours.map(tour => (
                        <div key={tour.id} className="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white" onClick={() => handleTourClick(tour)}>
                            <h3 className="text-lg font-semibold">{tour.title}</h3>
                            <p className="text-gray-600">{tour.description.length > 100 ? tour.description.substring(0, 100) + '...' : tour.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTour && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4" onClick={closeOverlay}>
                    <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold">{selectedTour.title}</h3>
                        <p>{selectedTour.description}</p>
                        <button 
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                            onClick={fetchBookings}
                        >
                            {showBookings ? 'Hide Bookings' : 'Show Bookings'}
                        </button>
                        <button 
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={closeOverlay}
                        >
                            &times;
                        </button>
                        {showBookings && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Bookings:</h4>
                                {bookingDetails.length > 0 ? (
                                    <ul>
                                        {bookingDetails.map(booking => (
                                            <li key={booking.id}>
                                                User Name: {booking.user_name}, Email: {booking.email}, Seats Booked: {booking.seats_booked}
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p>No bookings found for this tour.</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBookings;
