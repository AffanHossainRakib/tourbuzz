// src/pages/ContactUs.js
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    query: '',
  });

  const navigate = useNavigate(); // Hook to navigate to the previous page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    // Clear the form
    setFormData({
      name: '',
      contactNumber: '',
      query: '',
    });
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/pages/contact-background.jpeg)` }} // Path to your background image
    >
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Circular Back Button */}
      <button
        onClick={() => navigate(-1)} // Go to the previous page
        className="absolute top-8 left-8 p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-opacity-90 transition duration-300 z-20"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Contact Form */}
      <div className="relative z-10 bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-10 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-80"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Your Contact Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-80"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Your Query</label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Type your query here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none bg-white bg-opacity-80"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
