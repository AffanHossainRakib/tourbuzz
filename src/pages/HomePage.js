// src/pages/HomePage.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CarouselSlider from '../components/Slider';
import FeaturedTours from '../components/FeaturedTours';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const HomePage = () => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);

    const handleOverlayChange = (isOpen) => {
        setOverlayOpen(isOpen);
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen flex flex-col">
            {!isOverlayOpen && <Navbar />} {/* Hide Navbar if overlay is open */}
            <main className="flex-grow pt-16">
                <CarouselSlider />
                <SearchBar onOverlayChange={handleOverlayChange} />
                <FeaturedTours />
                
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
