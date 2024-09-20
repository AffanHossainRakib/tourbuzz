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
        <div 
            className="relative min-h-screen bg-cover bg-center text-white flex flex-col"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/tour-background.jpg')` }} // Background Image
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col">
                {!isOverlayOpen && <Navbar />} {/* Hide Navbar if overlay is open */}
                <main className="flex-grow pt-16">
                    <CarouselSlider />
                    <SearchBar onOverlayChange={handleOverlayChange} />
                    <FeaturedTours />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
