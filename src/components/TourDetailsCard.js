// src/components/TourDetailsCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Helper function to get full image URL from the public assets directory
const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

const TourDetailsCard = ({ tours, onOverlayOpenChange }) => {
    const [selectedTour, setSelectedTour] = useState(null);
    const navigate = useNavigate();

    const openTourDetails = (tour) => {
        setSelectedTour(tour);
        onOverlayOpenChange(true);
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
        onOverlayOpenChange(false);
    };

    const handleBookNow = () => {
        navigate('/payment', { state: { tour: selectedTour } });
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <div 
                        key={tour.id} 
                        className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                    >
                        <img 
                            src={getImageUrl(tour.image_url)} // Construct the full image URL 
                            alt={tour.title} 
                            className="h-48 w-full object-cover" 
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                            <p className="text-gray-700 mb-4">{tour.description}</p>
                            <p className="mb-2">Location: {tour.location}</p>
                            <p className="mb-2">Price: ${tour.price}</p>
                            <p className="mb-2">Seats Available: {tour.available_seats}</p>
                            <p className="mb-2">Start Date: {formatDate(tour.start_date)}</p>
                            {/* <p className="mb-2">End Date: {formatDate(tour.end_date)}</p> */}
                            <button 
                                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                                onClick={() => openTourDetails(tour)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tour Details Overlay */}
            {selectedTour && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-70" 
                        onClick={closeTourDetails}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <img 
                            src={getImageUrl(selectedTour.image_url)} // Construct the full image URL
                            alt={selectedTour.title} 
                            className="w-full h-64 object-cover rounded-lg mb-4" 
                        />
                        <h2 className="text-2xl font-bold mb-4">{selectedTour.title}</h2>
                        <p className="mb-4">{selectedTour.description}</p>
                        <p><strong>Location:</strong> {selectedTour.location}</p>
                        <p><strong>Price:</strong> ${selectedTour.price}</p>
                        <p><strong>Seats Available:</strong> {selectedTour.available_seats}</p>
                        <p><strong>Start Date:</strong> {formatDate(selectedTour.start_date)}</p>
                        <p><strong>End Date:</strong> {formatDate(selectedTour.end_date)}</p>
                        <button 
                            className="sticky bottom-0 w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                            onClick={handleBookNow}
                        >
                            Book Now
                        </button>
                        <button 
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={closeTourDetails}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TourDetailsCard;
