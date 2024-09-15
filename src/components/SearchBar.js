// src/components/SearchBar.js
import React, { useState, useEffect, useRef, useCallback } from 'react';

const SearchBar = ({ onOverlayChange }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        seats: ''
    });

    const overlayRef = useRef(null);

    const handleCloseOverlay = useCallback(() => {
        setOverlayOpen(false);
        onOverlayChange(false);
        setSearchQuery('');
        setFilters({
            location: '',
            maxPrice: '',
            seats: ''
        });
    }, [onOverlayChange]);

    const handleOpenOverlay = () => {
        setOverlayOpen(true);
        onOverlayChange(true);
    };

    // Handle click outside to close overlay
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                handleCloseOverlay();
            }
        };

        if (isOverlayOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOverlayOpen, handleCloseOverlay]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <>
            {/* Main Search Bar */}
            <div className="flex justify-center mt-8">
                <input
                    type="text"
                    placeholder="Search for tours..."
                    className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    onFocus={handleOpenOverlay}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Overlay for Expanded Search */}
            {isOverlayOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-start pt-20">
                    <div 
                        ref={overlayRef} 
                        className="bg-gray-800 bg-opacity-80 backdrop-blur-md w-3/4 h-4/5 rounded-lg shadow-lg p-8 relative flex"
                    >
                        {/* Filters Section */}
                        <div className="w-1/4 p-4 bg-gray-900 bg-opacity-70 text-white rounded-lg mr-6">
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

                        {/* Search Results Section */}
                        <div className="flex-grow">
                            <button
                                className="absolute top-4 right-4 text-gray-300 hover:text-white"
                                onClick={handleCloseOverlay}
                            >
                                &times; {/* Close Button */}
                            </button>
                            <h2 className="text-2xl mb-4">Search Results</h2>
                            <input
                                type="text"
                                placeholder="Search for tours..."
                                className="w-full px-4 py-2 mb-6 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400 transition duration-300"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            {/* Placeholder for search results */}
                            <div className="overflow-auto h-3/4">
                                {/* Add search results here */}
                                <p className="text-gray-300">Your search results will appear here...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;
