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
        <div className="px-4 py-2">
            <h2 className="text-2xl text-white font-bold mb-4">View Bookings</h2>
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
                        <div
                            key={tour.id}
                            className="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white"
                            onClick={() => handleTourClick(tour)}
                        >
                            <h3 className="text-lg font-semibold">{tour.title}</h3>
                            <p className="text-gray-600">{tour.description.length > 100 ? tour.description.substring(0, 100) + '...' : tour.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTour && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4" onClick={closeOverlay}>
                    <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold">{selectedTour.title}</h3>
                        <p>{selectedTour.description}</p>
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                            onClick={fetchBookings} // Fetch bookings when button is clicked
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
                            <div className="mt-4 overflow-y-auto max-h-[400px]">
                                <h4 className="font-semibold mb-4">Bookings:</h4>
                                {bookingDetails.length > 0 ? (
                                    <div className="space-y-4">
                                        {bookingDetails.map((booking, index) => (
                                            <div key={index} className="p-4 border rounded-lg shadow-md">
                                                <p><strong>User:</strong> {booking.user_name}</p>
                                                <p><strong>Email:</strong> {booking.email}</p>
                                                <p><strong>Seats Booked:</strong> {booking.seats_booked}</p>
                                            </div>
                                        ))}
                                    </div>
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
