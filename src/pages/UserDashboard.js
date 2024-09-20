import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Re-added Navbar component
import { FaUser, FaSuitcase, FaSignOutAlt } from 'react-icons/fa';

// Helper function to get the full image URL
const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

// Helper function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Overlay Component
const TourDetailsOverlay = ({ tour, seatsBooked, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
            <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                <img src={getImageUrl(tour.image_url)} alt={tour.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-left">{tour.title}</h2>
                <p className="mb-4 text-left">{tour.description}</p>
                <div className="text-left space-y-2">
                    <p><strong>Location:</strong> {tour.location}</p>
                    <p><strong>Price:</strong> ${tour.price}</p>
                    <p><strong>Seats Booked:</strong> {seatsBooked}</p>
                    <p><strong>Start Date:</strong> {formatDate(tour.start_date)}</p>
                    <p><strong>End Date:</strong> {formatDate(tour.end_date)}</p>
                    <p><strong>Status:</strong> {tour.status}</p>
                </div>
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);  // Store user bookings
    const [tours, setTours] = useState([]);  // Store tour details
    const [selectedTour, setSelectedTour] = useState(null);
    const [seatsBooked, setSeatsBooked] = useState(0); // Track seats booked for the selected tour
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '********',  // Password remains hidden unless edited
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('********');
    const navigate = useNavigate();

    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';
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
                        password: '********',
                    });
                    setNewEmail(email);

                    // Fetch bookings by user ID
                    return axios.get(`${serverBaseUrl}/GetBookingsByUserId/${response.data.id}`);
                })
                .then(bookingResponse => {
                    const userBookings = bookingResponse.data;
                    const aggregatedBookings = aggregateBookings(userBookings);

                    // Set bookings data
                    setBookings(aggregatedBookings);

                    // Fetch tour data for each booking
                    return axios.get(`${serverBaseUrl}/GetTours`);
                })
                .then(toursResponse => {
                    // Store fetched tours in state
                    setTours(toursResponse.data);
                })
                .catch(error => {
                    console.error('Error fetching profile, bookings, or tours:', error);
                });
        }
    }, [userEmail, serverBaseUrl]);

    // Aggregate bookings by summing seats for the same tour
    const aggregateBookings = (bookings) => {
        const aggregated = {};
        bookings.forEach((booking) => {
            if (!aggregated[booking.tour_id]) {
                aggregated[booking.tour_id] = { ...booking, seats_booked: 0 };
            }
            aggregated[booking.tour_id].seats_booked += booking.seats_booked;
        });
        return Object.values(aggregated);
    };

    const openTourDetails = (tourId) => {
        const tour = tours.find(t => t.id === tourId);
        const booking = bookings.find(b => b.tour_id === tourId);
        setSelectedTour(tour);
        setSeatsBooked(booking ? booking.seats_booked : 0);
    };

    const closeTourDetails = () => {
        setSelectedTour(null);
    };

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
        const updateData = {};
        if (newEmail !== profileData.email) {
            updateData.newEmail = newEmail;
        }
        if (newPassword !== '********') {
            updateData.newPassword = newPassword;
        }

        if (Object.keys(updateData).length === 0) {
            alert("No changes made to update.");
            return;
        }

        try {
            const response = await axios.post(`${serverBaseUrl}/UpdateUserProfile`, {
                email: profileData.email,
                ...updateData
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

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/user-dashboard-background.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Navbar /> {/* Added Navbar here */}

            <div className="relative z-10 flex pt-32 p-8">
                <div className="w-60 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg h-fit flex-shrink-0">
                    <ul className="space-y-4">
                        <li className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'profile' && 'bg-gray-700'}`} onClick={() => setActiveTab('profile')}>
                            <FaUser />
                            <span>Profile</span>
                        </li>
                        <li className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'bookings' && 'bg-gray-700'}`} onClick={() => setActiveTab('bookings')}>
                            <FaSuitcase />
                            <span>Bookings</span>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700" onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow ml-6">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white mb-1">Name</label>
                                    <input type="text" name="name" value={profileData.name} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Email</label>
                                    <input type="email" name="email" value={newEmail} onChange={handleProfileChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Password</label>
                                    <input type="password" name="password" value={newPassword} onChange={handleProfileChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none" />
                                </div>
                                {isEditing ? (
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={handleSaveProfile}>
                                        Save
                                    </button>
                                ) : (
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={handleProfileEditToggle}>
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-4">Your Bookings</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookings.map(booking => {
                                    const tour = tours.find(t => t.id === booking.tour_id);
                                    return tour ? (
                                        <div key={booking.tour_id} className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md relative">
                                            <img src={`${process.env.PUBLIC_URL}/assets/tours/${tour.image_url}`} alt={tour.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                            <h3 className="text-lg font-bold mb-2">{tour.title}</h3>
                                            <p><strong>Start Date:</strong> {formatDate(tour.start_date)}</p>
                                            <p><strong>Seats Booked:</strong> {booking.seats_booked}</p>
                                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300" onClick={() => openTourDetails(booking.tour_id)}>
                                                View Details
                                            </button>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedTour && <TourDetailsOverlay tour={selectedTour} seatsBooked={seatsBooked} onClose={closeTourDetails} />}
        </div>
    );
};

export default UserDashboard;
