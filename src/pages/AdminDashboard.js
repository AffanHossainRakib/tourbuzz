// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaUser, FaSuitcase, FaEdit, FaCamera, FaUserTie, FaBookOpen, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('createTour');
    const [selectedTour, setSelectedTour] = useState(null);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [showBookingsOverlay, setShowBookingsOverlay] = useState(false);
    const [showMediaOverlay, setShowMediaOverlay] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTourForBookings, setSelectedTourForBookings] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showEditGuideOverlay, setShowEditGuideOverlay] = useState(false);
    const [guideSearchQuery, setGuideSearchQuery] = useState('');

    // State for tours, users, and tour guides
    const [tours, setTours] = useState([]);
    const [users, setUsers] = useState([]);
    const [tourGuides, setTourGuides] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);

    // State for new tour form
    const [newTour, setNewTour] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        availableSeats: '',
        startDate: '',
        endDate: '',
        image: '',
        guideId: '',
        featured: false,
        status: 'available' // Set default status as 'available'
    });

    // State for new guide form
    const [newGuide, setNewGuide] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        experienceYears: 0,
        availabilityStatus: 'Available'
    });

    // Base URL for the backend server
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    // Fetch tours, users, guides, and media files on mount
    useEffect(() => {
        fetchTours();
        fetchUsers();
        fetchTourGuides();
        loadMediaFiles();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetToursWithGuideInfo`);
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetUsers`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTourGuides = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourGuides`);
            setTourGuides(response.data);
        } catch (error) {
            console.error('Error fetching tour guides:', error);
        }
    };

    // Load media files from /assets/tours directory
    // AdminDashboard.js

// Fetch media files
const loadMediaFiles = async () => {
    try {
        const response = await axios.get(`${serverBaseUrl}/GetMediaFiles`);
        setMediaFiles(response.data.files);
    } catch (error) {
        console.error('Error loading media files:', error);
    }
};



    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleFeatureToggle = async (tour) => {
        try {
            await axios.post(`${serverBaseUrl}/UpdateTour`, {
                id: tour.id,
                title: tour.title,
                description: tour.description,
                price: tour.price,
                featured: !tour.featured,
                status: tour.status
            });
            fetchTours(); // Refresh tours list
        } catch (error) {
            console.error('Error updating tour:', error);
        }
    };

    const handleEditTour = (tour) => {
        setSelectedTour(tour);
        setShowEditOverlay(true);
    };

    const handleEditSave = async () => {
        try {
            await axios.post(`${serverBaseUrl}/UpdateTour`, selectedTour);
            fetchTours(); // Refresh tours list
            setShowEditOverlay(false);
            setSelectedTour(null);
        } catch (error) {
            console.error('Error saving edited tour:', error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedTour(prev => ({ ...prev, [name]: value }));
    };

    const handleEditBookings = (tour) => {
        setSelectedTourForBookings(tour);
        setShowBookingsOverlay(true);
    };

    // Function to handle media file selection
    const handleSelectMedia = (file) => {
        setSelectedMedia(prev => {
            if (prev.includes(file)) {
                return prev.filter(item => item !== file);
            } else {
                return [...prev, file];
            }
        });
    };

    // Function to handle search
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to filter tours based on search
    const filteredTours = tours.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to filter users based on search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle media upload
    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file, i) => formData.append(`file_${i}`, file));

        try {
            await axios.post(`${serverBaseUrl}/UploadMedia`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            loadMediaFiles(); // Refresh media files
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    // Function to open media overlay
    const handleOpenMediaOverlay = () => {
        setShowMediaOverlay(true);
    };

    const handleEditGuide = (guide) => {
        setSelectedGuide(guide);
        setShowEditGuideOverlay(true);
    };

    const handleEditGuideSave = async () => {
        try {
            await axios.post(`${serverBaseUrl}/UpdateTourGuide`, selectedGuide);
            fetchTourGuides(); // Refresh tour guides list
            setShowEditGuideOverlay(false);
            setSelectedGuide(null);
        } catch (error) {
            console.error('Error saving edited tour guide:', error);
        }
    };

    const handleEditGuideChange = (e) => {
        const { name, value } = e.target;
        setSelectedGuide(prev => ({ ...prev, [name]: value }));
    };

    // Handle search in tour guides
    const handleGuideSearchChange = (e) => {
        setGuideSearchQuery(e.target.value);
    };

    // Filter tour guides based on search
    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(guideSearchQuery.toLowerCase())
    );

    // Create a new tour
    const handleCreateTour = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverBaseUrl}/CreateTour`, newTour);
            if (response.data.success) {
                fetchTours(); // Refresh tours list
                // Reset the form
                setNewTour({
                    title: '',
                    description: '',
                    location: '',
                    price: '',
                    availableSeats: '',
                    startDate: '',
                    endDate: '',
                    image: '',
                    guideId: '',
                    featured: false,
                    status: 'available' // Reset to default
                });
                setActiveTab('editTour');
            }
        } catch (error) {
            console.error('Error creating tour:', error);
        }
    };

    // Handle new tour input change
    const handleNewTourChange = (e) => {
        const { name, value } = e.target;
        setNewTour(prev => ({ ...prev, [name]: value }));
    };

    // Create a new tour guide
    const handleCreateGuide = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverBaseUrl}/CreateTourGuide`, newGuide);
            if (response.data.success) {
                fetchTourGuides(); // Refresh tour guides list
                // Reset the form
                setNewGuide({ name: '', email: '', phoneNumber: '', experienceYears: 0, availabilityStatus: 'Available' });
                setActiveTab('viewGuides');
            }
        } catch (error) {
            console.error('Error creating guide:', error);
        }
    };

    // Handle new guide input change
    const handleNewGuideChange = (e) => {
        const { name, value } = e.target;
        setNewGuide(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/admin-dashboard-background.jpg')` }}
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Navbar />

            <div className="relative z-10 flex pt-32 p-8">
                {/* Left Panel */}
                <div className="w-64 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg h-fit flex-shrink-0">
                    <ul className="space-y-4">
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'createTour' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('createTour')}
                        >
                            <FaSuitcase />
                            <span>Create Tour</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'editTour' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('editTour')}
                        >
                            <FaEdit />
                            <span>Edit Tour</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'createGuide' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('createGuide')}
                        >
                            <FaUserTie />
                            <span>Create Tour Guide</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'viewGuides' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('viewGuides')}
                        >
                            <FaUsers />
                            <span>View Tour Guides</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'viewUsers' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('viewUsers')}
                        >
                            <FaUser />
                            <span>View Users</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'viewBookings' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('viewBookings')}
                        >
                            <FaBookOpen />
                            <span>View Bookings</span>
                        </li>
                        <li
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-700 ${activeTab === 'manageMedia' && 'bg-gray-700'}`}
                            onClick={() => handleTabChange('manageMedia')}
                        >
                            <FaCamera />
                            <span>Manage Media</span>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-grow ml-6">
                    {activeTab === 'createTour' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Create Tour</h2>
                            <form className="space-y-4" onSubmit={handleCreateTour}>
                                <div>
                                    <label className="block text-white mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newTour.title}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={newTour.description}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={newTour.location}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={newTour.price}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Available Seats</label>
                                    <input
                                        type="number"
                                        name="availableSeats"
                                        value={newTour.availableSeats}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={newTour.startDate}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={newTour.endDate}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Assign Tour Guide</label>
                                    <select
                                        name="guideId"
                                        value={newTour.guideId}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    >
                                        <option value="">Select Guide</option>
                                        {tourGuides.map(guide => (
                                            <option key={guide.id} value={guide.id}>{guide.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={newTour.status}
                                        onChange={handleNewTourChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    >
                                        <option value="available">Available</option>
                                        <option value="booked">Booked</option>
                                    </select>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={newTour.featured}
                                        onChange={(e) => setNewTour(prev => ({ ...prev, featured: e.target.checked }))}
                                        className="mr-2"
                                    />
                                    <label className="text-white">Set as Featured</label>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Create Tour
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'editTour' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Edit Tour</h2>
                            <input
                                type="text"
                                placeholder="Search Tours..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <ul className="space-y-4">
                                {filteredTours.map((tour) => (
                                    <li key={tour.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                                        <div>
                                            <h3 className="text-xl font-bold">{tour.title}</h3>
                                            <p>{tour.description}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-sm bg-green-600 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleEditTour(tour)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleFeatureToggle(tour)}
                                            >
                                                {tour.featured ? 'Unfeature' : 'Feature'}
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'createGuide' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Create Tour Guide</h2>
                            <form className="space-y-4" onSubmit={handleCreateGuide}>
                                <div>
                                    <label className="block text-white mb-1">Guide Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newGuide.name}
                                        onChange={handleNewGuideChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newGuide.email}
                                        onChange={handleNewGuideChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={newGuide.phoneNumber}
                                        onChange={handleNewGuideChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Experience Years</label>
                                    <input
                                        type="number"
                                        name="experienceYears"
                                        value={newGuide.experienceYears}
                                        onChange={handleNewGuideChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Availability Status</label>
                                    <select
                                        name="availabilityStatus"
                                        value={newGuide.availabilityStatus}
                                        onChange={handleNewGuideChange}
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Create Guide
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'viewGuides' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">All Tour Guides</h2>
                            <input
                                type="text"
                                placeholder="Search Guides..."
                                value={guideSearchQuery}
                                onChange={handleGuideSearchChange}
                                className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <ul className="space-y-4">
                                {filteredGuides.map((guide) => (
                                    <li key={guide.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                                        <div>
                                            <h3 className="text-xl font-bold">{guide.name}</h3>
                                            <p>{guide.email}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-sm bg-green-600 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleEditGuide(guide)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-sm bg-red-600 text-white px-3 py-1 rounded-full"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'viewUsers' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">All Users</h2>
                            <input
                                type="text"
                                placeholder="Search Users..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <ul className="space-y-4">
                                {filteredUsers.map((user) => (
                                    <li key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                                        <div>
                                            <h3 className="text-xl font-bold">{user.name}</h3>
                                            <p>{user.email}</p>
                                        </div>
                                        <button className="text-sm bg-red-600 text-white px-3 py-1 rounded-full">Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'viewBookings' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                            <input
                                type="text"
                                placeholder="Search Tours..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <ul className="space-y-4">
                                {filteredTours.map((tour) => (
                                    <li key={tour.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                                        <div>
                                            <h3 className="text-xl font-bold">{tour.title}</h3>
                                        </div>
                                        <button
                                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full"
                                            onClick={() => handleEditBookings(tour)}
                                        >
                                            View Bookings
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'manageMedia' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Manage Media</h2>
                            <input
                                type="file"
                                onChange={handleMediaUpload}
                                multiple
                                className="mb-4"
                            />
                            <div className="grid grid-cols-4 gap-4">
                                {mediaFiles.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={`/assets/tours/${file}`}
                                            alt={`media-${index}`}
                                            className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer"
                                            onClick={() => setSelectedMedia(file)}
                                        />
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Tour Overlay */}
            {showEditOverlay && selectedTour && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={() => setShowEditOverlay(false)}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Edit Tour</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={selectedTour.title}
                                    name="title"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Description</label>
                                <textarea
                                    value={selectedTour.description}
                                    name="description"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-1">Location</label>
                                <input
                                    type="text"
                                    value={selectedTour.location}
                                    name="location"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Price</label>
                                <input
                                    type="number"
                                    value={selectedTour.price}
                                    name="price"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Available Seats</label>
                                <input
                                    type="number"
                                    value={selectedTour.availableSeats}
                                    name="availableSeats"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={selectedTour.startDate}
                                    name="startDate"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={selectedTour.endDate}
                                    name="endDate"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Assign Tour Guide</label>
                                <select
                                    value={selectedTour.guide}
                                    name="guide"
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                >
                                    {tourGuides.map(guide => (
                                        <option key={guide.id} value={guide.name}>{guide.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedTour.featured}
                                    name="featured"
                                    onChange={(e) => setSelectedTour(prev => ({ ...prev, featured: e.target.checked }))}
                                    className="mr-2"
                                />
                                <label>Set as Featured</label>
                            </div>
                            <button
                                type="button"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onClick={handleEditSave}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Show Bookings Overlay */}
            {showBookingsOverlay && selectedTourForBookings && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={() => setShowBookingsOverlay(false)}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{selectedTourForBookings.title} - Bookings</h2>
                        <ul className="space-y-4">
                            {selectedTourForBookings.usersBooked.map(user => (
                                <li key={user.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
                                    <div>
                                        <h3 className="text-xl font-bold">{user.name}</h3>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Media Overlay */}
            {showMediaOverlay && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={() => setShowMediaOverlay(false)}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Select Media</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {mediaFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`/assets/tours/${file}`}
                                        alt={`media-${index}`}
                                        className={`w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer ${selectedMedia.includes(file) && 'border-4 border-blue-600'}`}
                                        onClick={() => handleSelectMedia(file)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
                            onClick={() => setShowMediaOverlay(false)}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Tour Guide Overlay */}
            {showEditGuideOverlay && selectedGuide && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={() => setShowEditGuideOverlay(false)}
                    ></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Edit Tour Guide</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={selectedGuide.name}
                                    name="name"
                                    onChange={handleEditGuideChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={selectedGuide.email}
                                    name="email"
                                    onChange={handleEditGuideChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <button
                                type="button"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onClick={handleEditGuideSave}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
