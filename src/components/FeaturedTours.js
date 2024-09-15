// src/components/FeaturedTours.js
import React from 'react';
import TourCard from './TourCard';

// Sample data for featured tours
const featuredTours = [
    {
        id: 1,
        title: "Beach Paradise",
        description: "Enjoy a relaxing week at the beautiful beaches of Cox's Bazar.",
        image: "/assets/featured/cox.jpg",
    },
    {
        id: 2,
        title: "Mountain Adventure",
        description: "Embark on an exciting journey to the mountains of Sajek Valley.",
        image: "/assets/featured/sajek.jpg",
    },
    {
        id: 3,
        title: "Jungle Safari",
        description: "Discover the hidden treasures of the Sundarbans with our expert guides.",
        image: "/assets/featured/sundarbans.png",
    },
];

const FeaturedTours = () => {
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
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedTours;
