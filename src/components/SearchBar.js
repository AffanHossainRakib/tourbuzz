import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IconLucideSearch } from './IconLucideSearch'; // Adjust the path if needed
import axios from 'axios'; // To fetch tours data
import TourDetailsCard from './TourDetailsCard'; // Import the TourDetailsCard component

// Helper function to get the full image URL
const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

// Helper function to format date (yyyy/mm/dd) from the server format
const formatServerDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Make sure it's in the format yyyy-mm-dd to match the input type="date"
};

const SearchBar = ({ onOverlayChange }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [isTourDetailsOverlayOpen, setTourDetailsOverlayOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        maxPrice: '',
        seats: '',
        startDate: ''
    });
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const overlayRef = useRef(null);

    const handleCloseOverlay = useCallback(() => {
        setOverlayOpen(false);
        setTourDetailsOverlayOpen(false);
        setSelectedTour(null);
        onOverlayChange(false);
        setSearchQuery('');
        setFilters({
            search: '',
            location: '',
            maxPrice: '',
            seats: '',
            startDate: ''
        });
    }, [onOverlayChange]);

    const handleOpenOverlay = () => {
        setOverlayOpen(true);
        onOverlayChange(true);
    };

    const openTourDetails = (tour) => {
        setSelectedTour(tour); // Set the selected tour
        setTourDetailsOverlayOpen(true); // Open the tour details overlay
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
        setTourDetailsOverlayOpen(false);
    };

    // Fetch tours data from the backend
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost:5001/GetTours'); // Call the backend to fetch tours
                setTours(response.data); // Store fetched tours in state
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours(); // Call the function when the component mounts
    }, []);

    // Filtering logic based on filters
    useEffect(() => {
        const filtered = tours.filter((tour) => {
            const matchesTitle = filters.search === '' || tour.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchesLocation = filters.location === '' || tour.location.toLowerCase() === filters.location.toLowerCase();
            const matchesMaxPrice = filters.maxPrice === '' || tour.price <= Number(filters.maxPrice);
            const matchesSeats = filters.seats === '' || tour.available_seats >= Number(filters.seats);
            const matchesStartDate = filters.startDate === '' || formatServerDate(tour.start_date) >= filters.startDate; // Match only date part
            return matchesTitle && matchesLocation && matchesMaxPrice && matchesSeats && matchesStartDate;
        });
        setFilteredTours(filtered);
    }, [tours, filters]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            search: e.target.value,
        }));
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
            {/* Header Title */}
            <div className="flex flex-col items-center mt-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Find Your Perfect Tour
                </h2>
                
                {/* Main Search Bar */}
                <div className="relative w-3/4 md:w-1/2 flex items-center">
                    <input
                        type="text"
                        placeholder="Search for tours..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-10 glow-input"
                        onFocus={handleOpenOverlay}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <IconLucideSearch 
                        className="absolute right-4 text-gray-500 cursor-pointer" 
                        width="1.5em" 
                        height="1.5em"
                    />
                </div>
            </div>

            {/* Search Results Section */}
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
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
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
                            
                            {/* Search Results */}
                            <div className="flex-grow overflow-y-auto max-h-[60vh]">
                                {filteredTours.length > 0 ? (
                                    filteredTours.map((tour) => (
                                        <div key={tour.id} className="flex items-center mb-4 bg-gray-700 p-4 rounded-lg">
                                            <img 
                                                src={getImageUrl(tour.image_url)} // Use the getImageUrl function here
                                                alt={tour.title} 
                                                className="w-16 h-16 object-cover rounded-full mr-4"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold">{tour.title}</h3>
                                            </div>
                                            <button 
                                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                                                onClick={() => openTourDetails(tour)} // Open the overlay when "View Details" is clicked
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-300">No tours match your search.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tour Details Overlay */}
            {selectedTour && isTourDetailsOverlayOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-70" 
                        onClick={closeTourDetails}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <img 
                            src={getImageUrl(selectedTour.image_url)} // Use the getImageUrl function for details overlay
                            alt={selectedTour.title} 
                            className="w-full h-64 object-cover rounded-lg mb-4" 
                        />
                        <h2 className="text-2xl font-bold mb-4">{selectedTour.title}</h2>
                        <p className="mb-4">{selectedTour.description}</p>
                        <p><strong>Location:</strong> {selectedTour.location}</p>
                        <p><strong>Price:</strong> ${selectedTour.price}</p>
                        <p><strong>Seats Available:</strong> {selectedTour.available_seats}</p>
                        <p><strong>Start Date:</strong> {formatServerDate(selectedTour.start_date)}</p>
                        <p><strong>End Date:</strong> {formatServerDate(selectedTour.end_date)}</p> {/* End Date added here */}
                        <button 
                            className="sticky bottom-0 w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
                            onClick={() => { /* Handle booking */ }}
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

export default SearchBar;
