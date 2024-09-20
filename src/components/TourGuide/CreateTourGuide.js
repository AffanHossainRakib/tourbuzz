import React, { useState } from 'react';
import axios from 'axios';

const CreateTourGuide = () => {
    const [newGuide, setNewGuide] = useState({
        name: '',
        email: '',
        phone_number: '',
        experience_years: 0,
        availability_status: 'Available'
    });

    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    const handleCreateGuide = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverBaseUrl}/CreateTourGuide`, newGuide);
            if (response.data.success) {
                setNewGuide({
                    name: '',
                    email: '',
                    phone_number: '',
                    experience_years: 0,
                    availability_status: 'Available'
                });
                alert('Tour guide created successfully!');
            }
        } catch (error) {
            console.error('Error creating guide:', error);
            alert('Error creating tour guide.');
        }
    };

    const handleNewGuideChange = (e) => {
        const { name, value } = e.target;
        setNewGuide(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Create Tour Guide</h2>
            
            <form className="space-y-6" onSubmit={handleCreateGuide}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={newGuide.name} 
                        onChange={handleNewGuideChange} 
                        placeholder="Guide Name" 
                        required 
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={newGuide.email} 
                        onChange={handleNewGuideChange} 
                        placeholder="Guide Email" 
                        required 
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone_number" 
                        value={newGuide.phone_number} 
                        onChange={handleNewGuideChange} 
                        placeholder="Guide Phone Number" 
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700">Experience Years</label>
                    <input 
                        type="number" 
                        name="experience_years" 
                        value={newGuide.experience_years} 
                        onChange={handleNewGuideChange} 
                        placeholder="Years of Experience" 
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700">Availability Status</label>
                    <select 
                        name="availability_status" 
                        value={newGuide.availability_status} 
                        onChange={handleNewGuideChange} 
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>

                <div className="flex justify-center mt-6">
                    <button 
                        type="submit" 
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
                    >
                        Create Guide
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTourGuide;
