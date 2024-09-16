// src/components/Filters.js
import React from 'react';

const Filters = ({ filters, handleFilterChange }) => {
    return (
        <div 
            className="fixed top-32 left-8 w-64 p-4 bg-gray-900 bg-opacity-70 text-white rounded-lg shadow-lg h-auto"
        >
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2">Location</label>
                <select 
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                >
                    <option value="">Any</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="lake">Lake</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2">Maximum Price</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="w-full px-3 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 mb-2">Seats</label>
                <input
                    type="number"
                    name="seats"
                    value={filters.seats}
                    onChange={handleFilterChange}
                    placeholder="Number of Seats"
                    className="w-full px-3 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                />
            </div>
        </div>
    );
};

export default Filters;
