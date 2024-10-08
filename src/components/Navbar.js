// src/components/Navbar.js
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is logged in and if they are an admin
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            if (user.userType === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    const handleRedirect = () => {
        window.location.href = '/';
    };

    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-full px-10 py-4 flex justify-between items-center shadow-lg min-w-[300px] md:min-w-[600px] lg:min-w-[800px]">
            <div className="flex items-center space-x-4">
                <img src="/assets/logo.png" alt="TourBuzz" className="h-10 mr-4" />
                <span 
                    className="text-white text-2xl font-bold relative cursor-pointer hover:animate-glow"
                    onClick={handleRedirect}
                >
                    TourBuzz
                </span>
            </div>
            <ul className="flex space-x-8">
                <li><a href="/" className="text-white hover:text-orange-500">Home</a></li>
                <li><a href="/tours" className="text-white hover:text-orange-500">Tours</a></li>
                {isLoggedIn ? (
                    <>
                        <li><a href="/dashboard" className="text-white hover:text-orange-500">Dashboard</a></li>
                        {isAdmin && (
                            <li><a href="/admin" className="text-white hover:text-orange-500">Admin</a></li>
                        )}
                    </>
                ) : (
                    <li><a href="/authentication" className="text-white hover:text-orange-500">Sign in</a></li>
                )}
                <li><a href="/contact-us" className="text-white hover:text-orange-500">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
