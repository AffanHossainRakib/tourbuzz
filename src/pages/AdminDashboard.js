// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUser, FaSuitcase, FaEdit, FaCamera, FaUserTie, FaBookOpen, FaUsers } from 'react-icons/fa';

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

    // Dummy data for tours, users, and tour guides
    const [tours, setTours] = useState([
        {
            id: 1,
            title: 'Beach Paradise',
            description: 'A wonderful beach tour...',
            location: 'Beach',
            price: 300,
            availableSeats: 10,
            startDate: '2024-09-01',
            endDate: '2024-09-10',
            image: '/assets/tours/beach-paradise.jpg',
            featured: true,
            guide: 'John Guide',
            usersBooked: [{ id: 1, name: 'Jane Doe' }]
        },
        {
            id: 2,
            title: 'Mountain Adventure',
            description: 'An exciting mountain tour...',
            location: 'Mountain',
            price: 500,
            availableSeats: 15,
            startDate: '2024-09-15',
            endDate: '2024-09-25',
            image: '/assets/tours/mountain-adventure.jpg',
            featured: false,
            guide: 'Jane Guide',
            usersBooked: [{ id: 2, name: 'John Smith' }]
        }
    ]);

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    const [tourGuides, setTourGuides] = useState([
        { id: 1, name: 'John Guide', email: 'guide1@example.com' },
        { id: 2, name: 'Jane Guide', email: 'guide2@example.com' }
    ]);

    const [mediaFiles, setMediaFiles] = useState([
        'beach.jpg', 'mountain.jpg', 'city.jpg' // Dummy images
    ]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleFeatureToggle = (tourId) => {
        setTours(tours.map(tour =>
            tour.id === tourId ? { ...tour, featured: !tour.featured } : tour
        ));
    };

    const handleEditTour = (tour) => {
        setSelectedTour(tour);
        setShowEditOverlay(true);
    };

    const handleEditSave = () => {
        // Logic to save edited tour details
        setShowEditOverlay(false);
        setSelectedTour(null);
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
    const handleMediaUpload = (e) => {
        const files = Array.from(e.target.files).map(file => file.name);
        // Simulate file upload
        setMediaFiles(prev => [...prev, ...files]);
    };

    // Function to open media overlay
    const handleOpenMediaOverlay = () => {
        setShowMediaOverlay(true);
    };

    const handleEditGuide = (guide) => {
        setSelectedGuide(guide);
        setShowEditGuideOverlay(true);
    };

    const handleEditGuideSave = () => {
        // Logic to save edited guide details
        setShowEditGuideOverlay(false);
        setSelectedGuide(null);
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
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-white mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Description</label>
                                    <textarea
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Location</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Price</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Available Seats</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Image</label>
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                        onClick={handleOpenMediaOverlay}
                                    >
                                        + Add Image
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Assign Tour Guide</label>
                                    <select className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none">
                                        {tourGuides.map(guide => (
                                            <option key={guide.id} value={guide.name}>{guide.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <label className="text-white">Set as Featured</label>
                                </div>
                                <button
                                    type="button"
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
                                                onClick={() => handleFeatureToggle(tour.id)}
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
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-white mb-1">Guide Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="button"
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
                                <label className="block mb-1">Image</label>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                    onClick={handleOpenMediaOverlay}
                                >
                                    + Add Image
                                </button>
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
