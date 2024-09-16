// src/pages/UserDashboard.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TourDetailsOverlay from '../components/TourDetailsOverlay';
import { FaUser, FaSuitcase, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '********'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    // Example data for bookings and tour history
    const bookings = [
        { 
            id: 1, 
            title: 'Beach Paradise', 
            image: '/assets/tours/cox2.jpg', 
            date: '2024-09-01',
            fullDescription: 'Experience the beauty of the beach...', 
            location: 'Beach',
            price: 300,
            availableSeats: 10,
            startDate: '2024-09-01',
            endDate: '2024-09-10',
        },
        {
            id: 2, 
            title: 'Mountain Adventure', 
            image: '/assets/tours/sajek2.png', 
            date: '2024-09-15',
            fullDescription: 'An exciting mountain adventure awaits...', 
            location: 'Mountain',
            price: 500,
            availableSeats: 15,
            startDate: '2024-09-15',
            endDate: '2024-09-25',
        },
    ];

    const tourHistory = [
        { id: 1, title: 'Jungle Safari', image: '/assets/tours/sundarbans1.jpg', date: '2024-08-10' },
        { id: 2, title: 'Lake Expedition', image: '/assets/tours/haor.jpg', date: '2024-08-20' },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleProfileEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const openTourDetails = (tour) => {
        setSelectedTour(tour);
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
    };

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/user-dashboard-background.jpg')` }}
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {!selectedTour && <Navbar />}

            <div className="relative z-10 flex pt-32 p-8"> {/* Add padding to account for the fixed navbar */}
                {/* Left Panel */}
                <div className="w-60 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg h-fit flex-shrink-0"> {/* Fixed width */}
                    <ul className="space-y-4">
                        <li 
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'profile' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('profile')}
                        >
                            <FaUser />
                            <span>Profile</span>
                        </li>
                        <li 
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'bookings' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('bookings')}
                        >
                            <FaSuitcase />
                            <span>Bookings</span>
                        </li>
                        <li 
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'history' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('history')}
                        >
                            <FaHistory />
                            <span>Tour History</span>
                        </li>
                        <li 
                            className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700"
                            onClick={() => alert('Logging out...')} // Replace with actual logout logic
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-grow ml-6"> {/* Add margin-left to create space */}
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white mb-1">Name</label>
                                    <input 
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleProfileChange}
                                        disabled
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Email</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Password</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        value={profileData.password}
                                        onChange={handleProfileChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                    onClick={handleProfileEditToggle}
                                >
                                    {isEditing ? 'Save' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">My Bookings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookings.map((booking) => (
                                    <div 
                                        key={booking.id} 
                                        className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                                        onClick={() => openTourDetails(booking)}
                                    >
                                        <img src={booking.image} alt={booking.title} className="h-48 w-full object-cover" />
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold mb-2">{booking.title}</h3>
                                            <p className="text-gray-600">Date: {booking.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Tour History</h2>
                            <ul className="space-y-4">
                                {tourHistory.map((tour) => (
                                    <li key={tour.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
                                        <img src={tour.image} alt={tour.title} className="w-20 h-20 object-cover rounded-lg" />
                                        <div>
                                            <h3 className="text-xl font-bold">{tour.title}</h3>
                                            <p className="text-gray-600">Date: {tour.date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Tour Details Overlay */}
            {selectedTour && <TourDetailsOverlay tour={selectedTour} onClose={closeTourDetails} />}
        </div>
    );
};

export default UserDashboard;
