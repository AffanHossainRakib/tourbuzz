// src/pages/Tours.js
import React, { useState } from 'react';
import Filters from '../components/Filters';
import Navbar from '../components/Navbar';

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
        { id: 3, title: 'Jungle Safari', location: 'Jungle', price: 400, seats: 8 },
        { id: 4, title: 'Lake Retreat', location: 'Lake', price: 350, seats: 12 },
        { id: 5, title: 'Desert Exploration', location: 'Desert', price: 450, seats: 6 },
        { id: 6, title: 'Historical Tour', location: 'City', price: 250, seats: 15 },
        { id: 7, title: 'Cultural Experience', location: 'Village', price: 300, seats: 10 },
        { id: 8, title: 'Wildlife Adventure', location: 'Forest', price: 400, seats: 8 },
        { id: 9, title: 'Island Getaway', location: 'Island', price: 350, seats: 12 },
        { id: 10, title: 'Ski Trip', location: 'Ski Resort', price: 500, seats: 5 },
        { id: 11, title: 'Camping Expedition', location: 'Camping Site', price: 300, seats: 10 },
        { id: 12, title: 'Fishing Trip', location: 'Fishing Village', price: 350, seats: 12 },
        { id: 13, title: 'Sailing Adventure', location: 'Coast', price: 400, seats: 8 },
        { id: 14, title: 'Photography Tour', location: 'Scenic Spots', price: 250, seats: 15 },
        { id: 15, title: 'Food Tour', location: 'City', price: 300, seats: 10 },
        { id: 16, title: 'Wine Tasting', location: 'Vineyard', price: 350, seats: 12 },
        // Add more tour data as needed
    ];

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/tour-background.jpg')` }} // Using PUBLIC_URL for local images
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 flex text-white pt-32 ml-72 p-8"> {/* Adjust margin to accommodate fixed filters */}
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
