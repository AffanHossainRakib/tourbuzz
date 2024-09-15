// src/components/Slider.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slider data
const slides = [
    {
        image: '/assets/slider1.png',
        title: 'Beach Paradise',
        description: 'Relax and enjoy the beautiful beaches and crystal-clear waters.',
    },
    {
        image: '/assets/slider2.png',
        title: 'Mountain Adventure',
        description: 'Explore the majestic mountains with our guided tours.',
    },
    // {
    //     image: '/assets/slider3.jpg',
    //     title: 'City Lights',
    //     description: 'Discover the vibrant city life with our exclusive city tours.',
    // },
];

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => {
    return (
        <div 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 transition-transform duration-300 ease-in-out hover:scale-125"
            onClick={onClick}
        >
            <span className="text-4xl text-white">&gt;</span>
        </div>
    );
};

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }) => {
    return (
        <div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 transition-transform duration-300 ease-in-out hover:scale-125"
            onClick={onClick}
        >
            <span className="text-4xl text-white">&lt;</span>
        </div>
    );
};

const CarouselSlider = () => {
    const [loaded, setLoaded] = useState(false); // Track when the image is loaded

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000, // Stay on each slide for 7 seconds
        nextArrow: <NextArrow />, // Custom Next Arrow
        prevArrow: <PrevArrow />, // Custom Prev Arrow
        beforeChange: () => setLoaded(false), // Reset loaded state before changing slides
        afterChange: () => setLoaded(true), // Ensure the state is set after the change
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto mt-20 rounded-lg overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-[500px] object-cover rounded-lg" // Add rounding here
                            onLoad={() => setLoaded(true)} 
                        />
                        {loaded && (
                            <div className="absolute left-0 bottom-0 p-8 w-full">
                                <div className="bg-gradient-to-r from-black via-transparent to-transparent bg-opacity-40 px-4 py-2 rounded-lg max-w-md animate-slide-up">
                                    <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                                    <p className="text-lg">{slide.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselSlider;
