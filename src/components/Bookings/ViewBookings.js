import React, { useState, useEffect, useCallback } from 'react';
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

    // Fetch tours with useCallback to avoid unnecessary re-renders
    const fetchTours = useCallback(async () => {
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
    }, [serverBaseUrl]);

    // Fetch tours on component mount
    useEffect(() => {
        fetchTours();
    }, [fetchTours]);

    // Filter tours based on search term
    useEffect(() => {
        setFilteredTours(
            tours.filter(tour =>
                tour.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, tours]);

    const handleTourClick = (tour) => {
        setSelectedTour(tour);
        setShowBookings(false); // Ensure previous bookings are not displayed
        setBookingDetails([]);  // Clear previous bookings
    };

    const fetchBookings = async () => {
        if (!selectedTour) return; // Guard clause in case no tour is selected

        setIsLoading(true);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetBookingsByTourId/${selectedTour.id}`);
            if (response.data.success) {
                const aggregatedBookings = aggregateBookings(response.data.data || []);
                setBookingDetails(aggregatedBookings);
                setShowBookings(true);  // Show bookings when fetched
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to fetch bookings for the selected tour');
            setShowBookings(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Aggregate bookings by user and sum seats if they booked multiple times
    const aggregateBookings = (bookings) => {
        const aggregated = {};
        bookings.forEach(booking => {
            if (!aggregated[booking.user_name]) {
                aggregated[booking.user_name] = { ...booking, seats_booked: 0 };
            }
            aggregated[booking.user_name].seats_booked += booking.seats_booked;
        });
        return Object.values(aggregated); // Convert the aggregated object back to an array
    };

    const closeOverlay = () => {
        setSelectedTour(null);
        setShowBookings(false);
    };

    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            <h2 className="text-3xl text-white font-extrabold mb-6">View Bookings</h2>
            <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 transition duration-200"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.map(tour => (
                        <div
                            key={tour.id}
                            className="cursor-pointer p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                            onClick={() => handleTourClick(tour)}
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
                            <p className="text-gray-600 mt-2">{tour.description.length > 100 ? tour.description.substring(0, 100) + '...' : tour.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTour && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" onClick={closeOverlay}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedTour.title}</h3>
                        <p className="text-gray-700 mb-6">{selectedTour.description}</p>
                        <button
                            className="mb-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                            onClick={fetchBookings}
                        >
                            {showBookings ? 'Hide Bookings' : 'Show Bookings'}
                        </button>
                        <button
                            className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
                            onClick={closeOverlay}
                        >
                            &times;
                        </button>
                        {showBookings && (
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold mb-4 text-gray-900">Bookings:</h4>
                                {bookingDetails.length > 0 ? (
                                    <div className="space-y-4">
                                        {bookingDetails.map((booking, index) => (
                                            <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                                                <p className="text-gray-800"><strong>User:</strong> {booking.user_name}</p>
                                                <p className="text-gray-800"><strong>Email:</strong> {booking.email}</p>
                                                <p className="text-gray-800"><strong>Seats Booked:</strong> {booking.seats_booked}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className="text-gray-600">No bookings found for this tour.</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBookings;
