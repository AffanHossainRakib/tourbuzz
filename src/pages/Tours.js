// src/pages/Tours.js
import React, { useState } from 'react';
import Filters from '../components/Filters';
import Navbar from '../components/Navbar';
import TourDetailsCard from '../components/TourDetailsCard';

const Tours = () => {
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        seats: ''
    });
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Example tours data
    const tours = [
        { 
            id: 1, 
            title: 'Beach Paradise', 
            description: 'A wonderful beach tour...', 
            location: 'Beach', 
            price: 300, 
            seats: 10, 
            startDate: '2024-09-01', 
            endDate: '2024-09-10',
            availableSeats: 10,
            image: '/assets/tours/cox2.jpg' // Add tour image URL
        },
        {
            id: 2,
            title: 'Mountain Adventure',
            description: 'An exciting mountain tour...',
            location: 'Mountain',
            price: 500,
            seats: 15,
            startDate: '2024-09-15',
            endDate: '2024-09-25',
            availableSeats: 15,
            image: '/assets/tours/sajek1.png' // Add tour image URL
        },
        {
            id: 3,
            title: 'Jungle Safari',
            description: 'A thrilling jungle tour...',
            location: 'Jungle',
            price: 400,
            seats: 12,
            startDate: '2024-10-01',
            endDate: '2024-10-10',
            availableSeats: 12,
            image: '/assets/tours/sundarbans1.jpg' // Add tour image URL
        },
        {
            id: 4,
            title: 'Lake Expedition',
            description: 'A peaceful lake tour...',
            location: 'Lake',
            price: 350,
            seats: 8,
            startDate: '2024-10-15',
            endDate: '2024-10-25',
            availableSeats: 8,
            image: '/assets/tours/haor.jpg' // Add tour image URL
        },
        // ... other tours ...
    ];

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
                    <TourDetailsCard tours={tours} onOverlayOpenChange={handleOverlayOpenChange} />
                </div>
            </div>
        </div>
    );
};

export default Tours;
