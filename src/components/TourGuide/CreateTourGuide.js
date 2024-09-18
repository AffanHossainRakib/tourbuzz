import React, { useState } from 'react';
import axios from 'axios';

const CreateTourGuide = () => {
    const [newGuide, setNewGuide] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        experienceYears: 0,
        availabilityStatus: 'Available'
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
                    phoneNumber: '',
                    experienceYears: 0,
                    availabilityStatus: 'Available'
                });
            }
        } catch (error) {
            console.error('Error creating guide:', error);
        }
    };

    const handleNewGuideChange = (e) => {
        const { name, value } = e.target;
        setNewGuide(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create Tour Guide</h2>
            <form className="space-y-4" onSubmit={handleCreateGuide}>
                <input type="text" name="name" value={newGuide.name} onChange={handleNewGuideChange} placeholder="Name" required />
                <input type="email" name="email" value={newGuide.email} onChange={handleNewGuideChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={newGuide.phoneNumber} onChange={handleNewGuideChange} placeholder="Phone Number" />
                <input type="number" name="experienceYears" value={newGuide.experienceYears} onChange={handleNewGuideChange} placeholder="Experience Years" />
                <select name="availabilityStatus" value={newGuide.availabilityStatus} onChange={handleNewGuideChange}>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Guide</button>
            </form>
        </div>
    );
};

export default CreateTourGuide;
