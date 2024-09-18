import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaOverlay from './MediaOverlay';
import GuideSearch from './GuideSearch';

const CreateTour = () => {
    const [newTour, setNewTour] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        available_seats: '', 
        start_date: '', 
        end_date: '', 
        image_url: '', 
        guide_id: '', 
        featured: false,
        status: 'available'
    });
    const [tourGuides, setTourGuides] = useState([]);
    const [showMediaOverlay, setShowMediaOverlay] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]); 
    const [selectedMedia, setSelectedMedia] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); 

    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchTourGuides();
        loadMediaFiles(); 
    }, []);

    const fetchTourGuides = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourGuides`);
            setTourGuides(response.data);
        } catch (error) {
            console.error('Error fetching tour guides:', error);
        }
    };

    const loadMediaFiles = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetMediaFiles`);
            setMediaFiles(response.data.files);
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    };

    const handleCreateTour = async (e) => {
        e.preventDefault();

        const formattedStartDate = newTour.start_date.split('T')[0];
        const formattedEndDate = newTour.end_date.split('T')[0];

        try {
            const response = await axios.post(`${serverBaseUrl}/CreateTour`, {
                ...newTour,
                image_url: selectedMedia,
                start_date: formattedStartDate,
                end_date: formattedEndDate
            });
            if (response.data.success) {
                setNewTour({
                    title: '',
                    description: '',
                    location: '',
                    price: '',
                    available_seats: '',
                    start_date: '',
                    end_date: '',
                    image_url: '',
                    guide_id: '',
                    featured: false,
                    status: 'available'
                });
                setSelectedMedia('');
                alert('Tour created successfully!');
            }
        } catch (error) {
            console.error('Error creating tour:', error);
        }
    };

    const handleNewTourChange = (e) => {
        const { name, value } = e.target;
        setNewTour(prev => ({ ...prev, [name]: value }));
    };

    const openMediaOverlay = () => {
        setShowMediaOverlay(true);
    };

    const closeMediaOverlay = () => {
        setShowMediaOverlay(false);
    };

    const handleSelectMedia = (file) => {
        setSelectedMedia(file);
        closeMediaOverlay();
    };

    const handleSelectGuide = (guideId) => {
        setNewTour({ ...newTour, guide_id: guideId });
        setShowDropdown(false); 
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center bg-fixed p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create Tour</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreateTour}>
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
                        name="available_seats"
                        value={newTour.available_seats}
                        onChange={handleNewTourChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white mb-1">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={newTour.start_date.split('T')[0]}
                        onChange={handleNewTourChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white mb-1">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={newTour.end_date.split('T')[0]}
                        onChange={handleNewTourChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-white mb-1">Assign Tour Guide</label>
                    <GuideSearch
                        guides={tourGuides}
                        onSelect={handleSelectGuide}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown} 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-white mb-1">Select Media</label>
                    <button type="button" onClick={openMediaOverlay} className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        Select Media
                    </button>
                    {selectedMedia && <p className="text-white mt-2">Selected Media: {selectedMedia}</p>}
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
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                        Create Tour
                    </button>
                </div>
            </form>

            {showMediaOverlay && <MediaOverlay mediaFiles={mediaFiles} onSelect={handleSelectMedia} onClose={closeMediaOverlay} />}
        </div>
    );
};

export default CreateTour;
