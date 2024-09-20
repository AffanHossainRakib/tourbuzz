// src/pages/FAQs.js
import React, { useState } from 'react';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa'; // Import down arrow and left arrow icons
import { useNavigate } from 'react-router-dom';

const faqsData = [
  {
    question: "What is TourBuzz?",
    answer: "TourBuzz is a platform where you can find and book the best tours and travel experiences around the world.",
  },
  {
    question: "How do I book a tour?",
    answer: "To book a tour, simply browse through our available tours, select the one you like, and follow the on-screen instructions to complete your booking.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "You can cancel your booking up to 24 hours before the tour start time for a full refund. After that, refunds are not available.",
  },
  // Add more FAQs as needed
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-8 relative"
      style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/pages/faq.jpg')` }} // Background Image
    >
      {/* Transparent Layer */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Circular Back Button at the top of the page */}
      <button
        onClick={() => navigate(-1)} // Go to the previous page
        className="absolute top-8 left-8 p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-opacity-90 transition duration-300 z-20"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* FAQ Container with Navbar-like Transparency */}
      <div className="relative z-10 w-full max-w-3xl p-6 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg mt-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full text-left text-lg font-semibold py-4 flex justify-between items-center focus:outline-none text-white"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <FaChevronDown className={`transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {openIndex === index && (
                <div className="text-gray-300 pb-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
