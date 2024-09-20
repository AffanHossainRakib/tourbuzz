import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TourDetailsOverlay from '../components/TourDetailsOverlay';
import { FaUser, FaSuitcase, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '********',  // Password remains hidden unless edited
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [newEmail, setNewEmail] = useState('');  // New state for new email
    const [newPassword, setNewPassword] = useState('********');  // New state for new password
    const navigate = useNavigate();

    // Base URL for the backend server
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    // Get user email from localStorage
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

    useEffect(() => {
        if (userEmail) {
            // Fetch user data by email
            axios.get(`${serverBaseUrl}/GetUserProfile/${encodeURIComponent(userEmail)}`)
                .then(response => {
                    const { name, email } = response.data;
                    setProfileData({
                        name,
                        email,
                        password: '********',  // Don't fetch actual password
                    });
                    setNewEmail(email);  // Initialize the new email state with the current email
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    alert('Error fetching user profile.');
                });
        }
    }, [userEmail, serverBaseUrl]);

    const handleProfileEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setNewEmail(value);
        } else if (name === 'password') {
            setNewPassword(value);
        }
    };

    const handleSaveProfile = async () => {
        // Prepare the data to send
        const updateData = {};

        // Check if the email was modified
        if (newEmail !== profileData.email) {
            updateData.newEmail = newEmail;
        }

        // Check if the password was modified
        if (newPassword !== '********') {
            updateData.newPassword = newPassword;
        }

        // If no fields were modified, skip the update
        if (Object.keys(updateData).length === 0) {
            alert("No changes made to update.");
            return;
        }

        try {
            // Send the modified fields to the server
            const response = await axios.post(`${serverBaseUrl}/UpdateUserProfile`, {
                email: profileData.email,  // Send the current email to identify the user
                ...updateData  // Only send the modified fields
            });

            if (response.data.success) {
                alert('Profile updated successfully.');
                setProfileData({ ...profileData, email: newEmail });
                setIsEditing(false);
            } else {
                alert('Error updating profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile.');
        }
    };

    const openTourDetails = (tour) => {
        setSelectedTour(tour);
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Adjust this according to how you store the token
        localStorage.removeItem('user');  // Remove user data
        navigate('/');
    };

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/user-dashboard-background.jpg')` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {!selectedTour && <Navbar />}

            <div className="relative z-10 flex pt-32 p-8">
                {/* Left Panel */}
                <div className="w-60 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg h-fit flex-shrink-0">
                    <ul className="space-y-4">
                        <li 
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'profile' && 'bg-gray-700'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FaUser />
                            <span>Profile</span>
                        </li>
                        <li 
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'bookings' && 'bg-gray-700'}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            <FaSuitcase />
                            <span>Bookings</span>
                        </li>
                        <li 
                            className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-grow ml-6">
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
                                        disabled
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Email</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={newEmail}
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
                                        value={newPassword}  // Only set if there's a new password
                                        onChange={handleProfileChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                {isEditing ? (
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                        onClick={handleSaveProfile}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                        onClick={handleProfileEditToggle}
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedTour && <TourDetailsOverlay tour={selectedTour} onClose={closeTourDetails} />}
        </div>
    );
};

export default UserDashboard;
