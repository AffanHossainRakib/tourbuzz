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
        { id: 4, title: 'Jungle Safari', location: 'Jungle', price: 400, seats: 8 },
        { id: 5, title: 'City Tour', location: 'City', price: 100, seats: 20 },
        { id: 6, title: 'Historical Sites', location: 'Historical', price: 150, seats: 12 },
        { id: 7, title: 'Cultural Experience', location: 'Cultural', price: 250, seats: 18 },
        { id: 8, title: 'Wildlife Exploration', location: 'Wildlife', price: 350, seats: 6 },
        { id: 9, title: 'Desert Adventure', location: 'Desert', price: 450, seats: 4 },
        { id: 10, title: 'Island Hopping', location: 'Island', price: 600, seats: 2 },
        { id: 11, title: 'Food Tour', location: 'Food', price: 75, seats: 25 },
        { id: 12, title: 'Wine Tasting', location: 'Wine', price: 125, seats: 30 },
        { id: 13, title: 'Shopping Spree', location: 'Shopping', price: 50, seats: 40 },
        { id: 14, title: 'Adventure Sports', location: 'Adventure', price: 175, seats: 8 },
        { id: 15, title: 'Relaxation Retreat', location: 'Relaxation', price: 225, seats: 12 },
        { id: 16, title: 'Sightseeing Tour', location: 'Sightseeing', price: 125, seats: 20 },
        { id: 17, title: 'Photography Tour', location: 'Photography', price: 200, seats: 15 },
        { id: 18, title: 'Music Festival', location: 'Music', price: 100, seats: 50 },
        { id: 19, title: 'Camping Adventure', location: 'Camping', price: 300, seats: 10 },
        { id: 20, title: 'Winter Wonderland', location: 'Winter', price: 275, seats: 8 },
        // Add more tour data as needed
    ];

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/tour-background.jpg')` }} // Using PUBLIC_URL for local images
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Main Content */}
            <div className="relative z-10 flex text-white p-8">
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
