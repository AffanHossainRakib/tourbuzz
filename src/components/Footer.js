// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-center items-center py-6 px-4">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-xl w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* About Us Section */}
                    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-md flex flex-col items-center">
                        <h4 className="text-2xl font-semibold mb-4 text-white">About Us</h4>
                        <p className="text-gray-300 text-center">
                            TourBuzz is your go-to platform for finding the best tours around the world. We offer a wide range of tours tailored to meet your needs.
                        </p>
                    </div>
                    
                    {/* Quick Links Section */}
                    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-md flex flex-col items-center">
                        <h4 className="text-2xl font-semibold mb-4 text-white">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-4 w-full text-center"> {/* 2x2 grid layout */}
                            <a href="/" className="bg-blue-700 bg-opacity-90 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Home</a>
                            <a href="/tours" className="bg-blue-700 bg-opacity-90 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Tours</a>
                            <a href="/contact-us" className="bg-blue-700 bg-opacity-90 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300">Contact Us</a>
                            <a href="/faqs" className="bg-blue-700 bg-opacity-90 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300">FAQs</a>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-md flex flex-col items-center">
                        <h4 className="text-2xl font-semibold mb-4 text-white">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition-transform transform hover:-translate-y-1"
                            >
                                <img src="/assets/icons/facebook.png" alt="Facebook" className="h-8 w-8"/>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition-transform transform hover:-translate-y-1"
                            >
                                <img src="/assets/icons/twitter.png" alt="Twitter" className="h-8 w-8"/>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition-transform transform hover:-translate-y-1"
                            >
                                <img src="/assets/icons/instagram.png" alt="Instagram" className="h-8 w-8"/>
                            </a>
                            <a 
                                href="https://github.com/AffanHossainRakib/tourbuzz/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition-transform transform hover:-translate-y-1"
                            >
                                <img src="/assets/icons/github.png" alt="Github" className="h-8 w-8"/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 border-t border-gray-700 pt-2 text-center"> {/* Adjusted margin-top */}
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} TourBuzz. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
