// client/src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-between items-center p-6 bg-gray-800 text-white">
            <div>
                <img src="/assets/logo.png" alt="TourBuzz" className="h-10 mb-2" />
                <p>About TourBuzz - Your local tour booking site.</p>
            </div>
            <div className="text-right">
                <h4 className="text-lg font-bold mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                    <a href="#facebook" className="hover:text-blue-500">Facebook</a>
                    <a href="#instagram" className="hover:text-pink-500">Instagram</a>
                    <a href="#twitter" className="hover:text-blue-300">Twitter</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
