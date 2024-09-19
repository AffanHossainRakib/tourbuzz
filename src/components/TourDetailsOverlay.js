import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to get the full image URL
const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

// Helper function to format the date as dd/mm/yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const TourDetailsOverlay = ({ tour, onClose }) => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        // Navigate to the payment page with tour details
        navigate('/payment', { state: { tour } });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
                className="absolute inset-0 bg-black bg-opacity-70" 
                onClick={onClose}
            ></div>
            <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                {/* Use getImageUrl to construct the full image path */}
                <img 
                    src={getImageUrl(tour.image_url)} 
                    alt={tour.title} 
                    className="w-full h-64 object-cover rounded-lg mb-4" 
                />
                <h2 className="text-2xl font-bold mb-4 text-left">{tour.title}</h2>
                <p className="mb-4 text-left">{tour.description}</p>
                <div className="text-left space-y-2">
                    <p><strong>Location:</strong> {tour.location}</p>
                    <p><strong>Price:</strong> ${tour.price}</p>
                    <p><strong>Seats Available:</strong> {tour.available_seats}</p>
                    <p><strong>Start Date:</strong> {formatDate(tour.start_date)}</p>
                    <p><strong>End Date:</strong> {formatDate(tour.end_date)}</p>
                    <p><strong>Status:</strong> {tour.status}</p> {/* Show tour status (available/booked) */}
                </div>
                <button 
                    className="sticky bottom-0 w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                    onClick={handleBookNow} // Add click handler for booking
                >
                    Book Now
                </button>
                <button 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default TourDetailsOverlay;
