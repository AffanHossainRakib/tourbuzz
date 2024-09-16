// src/components/FeaturedTours.js
import React, { useState } from 'react';
import TourCard from './TourCard';
import TourDetailsOverlay from './TourDetailsOverlay'; // Import TourDetailsOverlay component

// Sample data for featured tours
const featuredTours = [
    {
        id: 1,
        title: "Beach Paradise",
        description: "Enjoy a relaxing week at the beautiful beaches of Cox's Bazar.",
        image: "/assets/featured/cox.jpg",
        location: 'Beach',
        price: 300,
        seats: 10,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
        availableSeats: 10,
        fullDescription: "Experience the serene beauty of Cox's Bazar beach and indulge in a range of water activities. Perfect for families and couples looking to escape to a tropical paradise."
    },
    {
        id: 2,
        title: "Mountain Adventure",
        description: "Embark on an exciting journey to the mountains of Sajek Valley.",
        image: "/assets/featured/sajek.jpg",
        location: 'Mountain',
        price: 500,
        seats: 15,
        startDate: '2024-09-15',
        endDate: '2024-09-25',
        availableSeats: 15,
        fullDescription: "Explore the breathtaking Sajek Valley, with its rolling hills and stunning landscapes. An adventure for those seeking the thrill of the great outdoors."
    },
    {
        id: 3,
        title: "Jungle Safari",
        description: "Discover the hidden treasures of the Sundarbans with our expert guides.",
        image: "/assets/featured/sundarbans.png",
        location: 'Jungle',
        price: 400,
        seats: 12,
        startDate: '2024-10-01',
        endDate: '2024-10-10',
        availableSeats: 12,
        fullDescription: "Dive into the heart of the Sundarbans and witness the beauty of the world's largest mangrove forest. Our guides will take you on an unforgettable journey through the jungle."
    },
];

const FeaturedTours = () => {
    const [selectedTour, setSelectedTour] = useState(null);

    const openTourDetails = (tour) => {
        setSelectedTour(tour);
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
    };

    return (
        <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Featured Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
                {featuredTours.map((tour) => (
                    <TourCard
                        key={tour.id}
                        title={tour.title}
                        description={tour.description}
                        image={tour.image}
                        onViewDetails={() => openTourDetails(tour)} // Pass function to open overlay
                    />
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
}

export default FeaturedTours;
