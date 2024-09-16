// src/components/TourDetailsOverlay.js
import React from 'react';

const TourDetailsOverlay = ({ tour, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
                className="absolute inset-0 bg-black bg-opacity-70" 
                onClick={onClose}
            ></div>
            <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                <img src={tour.image} alt={tour.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-left">{tour.title}</h2>
                <p className="mb-4 text-left">{tour.fullDescription}</p>
                <div className="text-left space-y-2"> {/* Wrapper div for alignment */}
                    <p><strong>Location:</strong> {tour.location}</p>
                    <p><strong>Price:</strong> ${tour.price}</p>
                    <p><strong>Seats Available:</strong> {tour.availableSeats}</p>
                    <p><strong>Start Date:</strong> {tour.startDate}</p>
                    <p><strong>End Date:</strong> {tour.endDate}</p>
                </div>
                <button className="sticky bottom-0 w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
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
