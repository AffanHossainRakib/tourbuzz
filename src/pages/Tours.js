// src/pages/Tours.js
import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import Navbar from '../components/Navbar';
import TourDetailsCard from '../components/TourDetailsCard';
import axios from 'axios'; // To fetch tours data

const Tours = () => {
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        seats: ''
    });
    const [tours, setTours] = useState([]); // Store the fetched tours data
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
    }, []); // Empty dependency array ensures it runs only once on mount

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleOverlayOpenChange = (isOpen) => {
        setIsOverlayOpen(isOpen);
    };

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/tour-background.jpg')` }} // Using PUBLIC_URL for local images
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Navbar */}
            {!isOverlayOpen && <Navbar />} {/* Hide Navbar when overlay is open */}

            {/* Main Content */}
            <div className={`relative z-10 flex text-white ${isOverlayOpen ? 'pt-8' : 'pt-32'} ml-72 p-8`}>
                {/* Filters Section */}
                <Filters filters={filters} handleFilterChange={handleFilterChange} />

                {/* Tours Section */}
                <div className="flex-grow">
                    <h2 className="text-3xl mb-4">All Tours</h2>
                    {/* Pass fetched tours to TourDetailsCard */}
                    <TourDetailsCard tours={tours} onOverlayOpenChange={handleOverlayOpenChange} />
                </div>
            </div>
        </div>
    );
};

export default Tours;
