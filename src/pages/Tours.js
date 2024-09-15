// src/pages/Tours.js
import React, { useState } from 'react';
import Filters from '../components/Filters';

const Tours = () => {
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        seats: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Example tours data
    const tours = [
        { id: 1, title: 'Beach Paradise', location: 'Beach', price: 300, seats: 10 },
        { id: 2, title: 'Mountain Adventure', location: 'Mountain', price: 500, seats: 5 },
        { id: 3, title: 'Lake Relaxation', location: 'Lake', price: 200, seats: 15 },
        // Add more tour data as needed
    ];

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/tour-background.jpg')` }} // Use the public folder image path
        >
            {/* Transparent Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            <div className="relative flex text-white p-8">
                {/* Filters Section */}
                <Filters filters={filters} handleFilterChange={handleFilterChange} />

                {/* Tours Section */}
                <div className="flex-grow">
                    <h2 className="text-3xl mb-4">All Tours</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tours.map((tour) => (
                            <div key={tour.id} className="bg-gray-900 bg-opacity-70 rounded-lg p-4 shadow-lg">
                                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                                <p className="mb-2">Location: {tour.location}</p>
                                <p className="mb-2">Price: ${tour.price}</p>
                                <p className="mb-2">Seats Available: {tour.seats}</p>
                                <button className="mt-4 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition text-white">View Details</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tours;
