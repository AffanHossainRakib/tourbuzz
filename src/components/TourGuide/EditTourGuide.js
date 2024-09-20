import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EditTourGuide = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [tourGuides, setTourGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    const formRef = useRef(null); // Ref to track the form

    useEffect(() => {
        fetchTourGuides();
    }, []);

    const fetchTourGuides = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourGuides`);
            setTourGuides(response.data);
        } catch (error) {
            console.error('Error fetching tour guides:', error);
            setErrorMessage('Error fetching tour guides.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditGuideChange = (e) => {
        const { name, value } = e.target;
        setSelectedGuide(prev => ({ ...prev, [name]: value }));
    };

    const handleEditGuideSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${serverBaseUrl}/UpdateTourGuide`, selectedGuide);
            setSuccessMessage('Tour guide updated successfully.');
            setErrorMessage('');
            fetchTourGuides();  // Refresh the list after update
            setSelectedGuide(null); // Close the form after saving
            setShowEditOverlay(false);
        } catch (error) {
            console.error('Error saving guide:', error);
            setErrorMessage('Error saving guide.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteGuide = async (guideId) => {
        const confirmed = window.confirm('Are you sure you want to delete this guide?');
        if (!confirmed) return;

        try {
            const response = await axios.post(`${serverBaseUrl}/DeleteTourGuide`, { id: guideId });
            alert(response.data.message);  // Show success message
            fetchTourGuides();  // Refresh the list of guides after deletion
        } catch (error) {
            console.error('Error deleting guide:', error);
            alert('Error deleting tour guide.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h2 className="text-3xl text-white font-bold mb-4 text-gray-800">Edit Tour Guide</h2>

            <input
                type="text"
                placeholder="Search for a guide..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Grid Layout for Tour Guides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.length > 0 ? (
                    filteredGuides.map(guide => (
                        <div
                            key={guide.id}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div>
                                <p className="font-semibold text-lg">{guide.name}</p>
                                <p className="text-sm text-gray-600">{guide.email}</p>
                                <p className="text-sm text-gray-600">{guide.phone_number}</p>
                                <p className="text-sm text-gray-600">{guide.availability_status}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => {
                                        setSelectedGuide(guide);
                                        setShowEditOverlay(true);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteGuide(guide.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No guides found.</p>
                )}
            </div>

            {/* Edit Overlay */}
            {showEditOverlay && selectedGuide && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setShowEditOverlay(false)}
                >
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">Edit Guide: {selectedGuide.name}</h3>

                        <form ref={formRef} className="space-y-4" onSubmit={handleEditGuideSave}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedGuide.name || ''}
                                    onChange={handleEditGuideChange}
                                    placeholder="Name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedGuide.email || ''}
                                    onChange={handleEditGuideChange}
                                    placeholder="Email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={selectedGuide.phone_number || ''}
                                    onChange={handleEditGuideChange}
                                    placeholder="Phone Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700">Experience Years</label>
                                <input
                                    type="number"
                                    name="experience_years"
                                    value={selectedGuide.experience_years || ''}
                                    onChange={handleEditGuideChange}
                                    placeholder="Experience Years"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700">Availability Status</label>
                                <select
                                    name="availability_status"
                                    value={selectedGuide.availability_status || 'available'}
                                    onChange={handleEditGuideChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>

                            <div className="flex justify-end mt-4 space-x-4">
                                <button
                                    type="submit"
                                    className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={() => setShowEditOverlay(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTourGuide;
