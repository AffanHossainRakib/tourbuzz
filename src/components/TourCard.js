// src/components/TourCard.js
import React from 'react';

const TourCard = ({ title, description, image }) => {
    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <img src={image} alt={title} className="h-48 w-full object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default TourCard;
