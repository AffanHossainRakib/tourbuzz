import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EditTourGuide = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [tourGuides, setTourGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    const formRef = useRef(null);

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
            fetchTourGuides();
            setSelectedGuide(null);
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
            alert(response.data.message);
            fetchTourGuides();
        } catch (error) {
            console.error('Error deleting guide:', error);
            alert('Error deleting tour guide.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setSelectedGuide(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formRef]);

    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Tour Guide</h2>

            {loading && <p className="text-center text-blue-600">Loading...</p>}

            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for a guide..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out"
                />
            </div>

            {/* Scrollable container for tour guides */}
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Tour Guides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredGuides.length > 0 ? (
                        filteredGuides.map(guide => (
                            <div
                                key={guide.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-100 ${
                                    selectedGuide && selectedGuide.id === guide.id ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => setSelectedGuide(guide)}
                            >
                                <p className="font-medium">{guide.name}</p>
                                <p className="text-sm text-gray-600">{guide.email}</p>
                                <p className="text-sm text-gray-600">{guide.phone_number}</p>
                                <p className="text-sm text-gray-600">{guide.availability_status}</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteGuide(guide.id);
                                        }}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setSelectedGuide(guide)}
                                        className="text-indigo-600 hover:text-indigo-800 transition"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No guides found.</p>
                    )}
                </div>
            </div>

            {selectedGuide && (
                <form ref={formRef} className="space-y-4 mt-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleEditGuideSave}>
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

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditTourGuide;
