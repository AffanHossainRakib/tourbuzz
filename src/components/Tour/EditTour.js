import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuideSearch from './GuideSearch'; // Assuming you have a GuideSearch component
import MediaOverlay from './MediaOverlay'; // Assuming you have a MediaOverlay component

const EditTours = () => {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [tourGuides, setTourGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [showMediaOverlay, setShowMediaOverlay] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchTours();
        fetchTourGuides();
        loadMediaFiles();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTours`);
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
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

    const loadMediaFiles = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetMediaFiles`);
            setMediaFiles(response.data.files);
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    };

    const fetchTourGuideById = async (guideId) => {
        if (!guideId) return;
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourGuideById/${guideId}`);
            setSelectedGuide(response.data);
        } catch (error) {
            console.error('Error fetching tour guide:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as a local date (without time zones)
        const formattedDate = new Intl.DateTimeFormat('en-CA').format(date); // Format as YYYY-MM-DD
        return formattedDate;
      };
      
      const handleEditTour = (tour) => {
        setSelectedTour({
          ...tour,
          start_date: formatDate(tour.start_date),  // Use local date formatting
          end_date: formatDate(tour.end_date),      // Use local date formatting
        });
        fetchTourGuideById(tour.guide_id);
        setShowEditOverlay(true);
      };
      

    const handleSaveChanges = async () => {
        const updatedTour = { ...selectedTour };

        try {
            await axios.post(`${serverBaseUrl}/UpdateTour`, {
                ...updatedTour,
                start_date: updatedTour.start_date,  // Already in YYYY-MM-DD format
                end_date: updatedTour.end_date       // Already in YYYY-MM-DD format
            });
            alert('Tour updated successfully!');
            setShowEditOverlay(false);  // Close the overlay after saving
            fetchTours();  // Refresh the tour list
        } catch (error) {
            console.error('Error updating tour:', error);
        }
    };

    const handleSelectGuide = async (guideId) => {
        const previousGuideId = selectedTour.guide_id;
    
        // Update the selected guide in the tour without clearing other fields
        setSelectedTour((prev) => ({ ...prev, guide_id: guideId }));
    
        // Fetch and set the selected guide's details
        fetchTourGuideById(guideId);
    
        // Only proceed with guide availability update if the selected guide is different from the previous guide
        if (previousGuideId !== guideId) {
            try {
                // Make the previous guide available
                if (previousGuideId) {
                    await axios.post(`${serverBaseUrl}/UpdateTourGuide`, {
                        id: previousGuideId,
                        availability_status: 'available',
                    });
                }
                // Make the new guide unavailable
                await axios.post(`${serverBaseUrl}/UpdateTourGuide`, {
                    id: guideId,
                    availability_status: 'unavailable',
                });
            } catch (error) {
                console.error('Error updating guide availability:', error);
            }
        }
    };
    

    const handleDeleteTour = async (tourId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this tour?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${serverBaseUrl}/DeleteTour/${tourId}`);
            alert('Tour deleted successfully!');
            fetchTours();  // Refresh the tour list after deletion
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    const handleOpenMediaOverlay = () => {
        setShowMediaOverlay(true);
    };

    const handleSelectMedia = (file) => {
        setSelectedTour((prev) => ({ ...prev, image_url: file }));
        setShowMediaOverlay(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTours = tours.filter((tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Tours</h2>

            <input
                type="text"
                placeholder="Search tours"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
            />

            <ul className="space-y-4">
                {filteredTours.map((tour) => (
                    <li key={tour.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
                        <span>{tour.title}</span>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleEditTour(tour)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTour(tour.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showEditOverlay && selectedTour && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowEditOverlay(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-h-screen overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">Edit Tour: {selectedTour.title}</h3>

                        <label className="block mb-2">Title:</label>
                        <input
                            type="text"
                            value={selectedTour.title}
                            onChange={(e) => setSelectedTour({ ...selectedTour, title: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={selectedTour.description}
                            onChange={(e) => setSelectedTour({ ...selectedTour, description: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">Price:</label>
                        <input
                            type="number"
                            value={selectedTour.price}
                            onChange={(e) => setSelectedTour({ ...selectedTour, price: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">Available Seats:</label>
                        <input
                            type="number"
                            value={selectedTour.available_seats}
                            onChange={(e) => setSelectedTour({ ...selectedTour, available_seats: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">Start Date:</label>
                        <input
                            type="date"
                            value={selectedTour.start_date}
                            onChange={(e) => setSelectedTour({ ...selectedTour, start_date: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">End Date:</label>
                        <input
                            type="date"
                            value={selectedTour.end_date}
                            onChange={(e) => setSelectedTour({ ...selectedTour, end_date: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        />

                        <label className="block mb-2">Tour Guide:</label>
                        <GuideSearch
                            guides={tourGuides}
                            onSelect={handleSelectGuide}
                        />
                        {selectedGuide && (
                            <div className="mt-4">
                                <p>Selected Guide: {selectedGuide.name}</p>
                                <p>Experience: {selectedGuide.experience_years} years</p>
                            </div>
                        )}

                        <label className="block mb-2">Status:</label>
                        <select
                            value={selectedTour.status}
                            onChange={(e) => setSelectedTour({ ...selectedTour, status: e.target.value })}
                            className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                        </select>

                        <label className="block mb-2">Featured:</label>
                        <input
                            type="checkbox"
                            checked={selectedTour.featured}
                            onChange={(e) => setSelectedTour({ ...selectedTour, featured: e.target.checked })}
                            className="mb-4"
                        />

                        <label className="block mb-2">Media:</label>
                        <button
                            type="button"
                            onClick={handleOpenMediaOverlay}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Select Media
                        </button>
                        {selectedTour.image_url && <p className="mt-2">Selected Media: {selectedTour.image_url}</p>}

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowEditOverlay(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showMediaOverlay && (
                <MediaOverlay
                    mediaFiles={mediaFiles}
                    onSelect={handleSelectMedia}
                    onClose={() => setShowMediaOverlay(false)}
                />
            )}
        </div>
    );
};

export default EditTours;
