import React, { useState, useEffect } from 'react';
import axios from 'axios'; // To fetch data from the backend
import TourCard from './TourCard';
import TourDetailsOverlay from './TourDetailsOverlay'; // Import TourDetailsOverlay component

// Helper function to get the full image URL
const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

const FeaturedTours = () => {
    const [featuredTours, setFeaturedTours] = useState([]); // State to store featured tours
    const [selectedTour, setSelectedTour] = useState(null); // State to manage selected tour for the overlay
    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the displayed tours

    // Function to fetch all tours and filter the featured ones
    const fetchTours = async () => {
        try {
            const response = await axios.get('http://localhost:5001/GetTours'); // Fetch all tours
            const allTours = response.data;

            // Filter the tours where 'featured' is true
            const filteredFeaturedTours = allTours.filter(tour => tour.featured); 
            setFeaturedTours(filteredFeaturedTours); // Store only the featured tours
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    useEffect(() => {
        fetchTours(); // Fetch and filter tours when component mounts
    }, []);

    // Automatically change the displayed tours every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredTours.length); // Move to the next tour and wrap around
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [featuredTours.length]);

    const openTourDetails = (tour) => {
        setSelectedTour(tour); // Set selected tour for the overlay
    };

    const closeTourDetails = () => {
        setSelectedTour(null); // Clear selected tour to close overlay
    };

    // Generate displayed tours in a circular fashion
    const getDisplayedTours = () => {
        if (featuredTours.length < 3) {
            return featuredTours; // If there are fewer than 3 tours, return all
        }

        const displayed = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % featuredTours.length; // Calculate the next index in a circular way
            displayed.push(featuredTours[index]);
        }

        return displayed;
    };

    const displayedTours = getDisplayedTours();

    return (
        <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Featured Tours</h2>

            {/* Display tours in a 1x3 grid with equal spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
                {displayedTours.map((tour, index) => (
                    <div
                        key={tour.id}
                        className="transform transition-transform duration-1000 ease-in-out"
                    >
                        <TourCard
                            title={tour.title}
                            description={tour.description}
                            image={getImageUrl(tour.image_url)} // Use dynamic image URL from the backend
                            onViewDetails={() => openTourDetails(tour)} // Pass function to open overlay
                        />
                    </div>
                ))}
            </div>

            {/* Tour Details Overlay */}
            {selectedTour && (
                <TourDetailsOverlay 
                    tour={selectedTour} 
                    onClose={closeTourDetails}
                />
            )}
        </section>
    );
};

export default FeaturedTours;
