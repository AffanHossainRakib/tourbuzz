import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTourGuide = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [tourGuides, setTourGuides] = useState([]);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchTourGuides();
    }, []);

    const fetchTourGuides = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTourGuides`);
            setTourGuides(response.data);
        } catch (error) {
            console.error('Error fetching tour guides:', error);
        }
    };

    const handleEditGuideChange = (e) => {
        const { name, value } = e.target;
        setSelectedGuide(prev => ({ ...prev, [name]: value }));
    };

    const handleEditGuideSave = async () => {
        try {
            await axios.post(`${serverBaseUrl}/UpdateTourGuide`, selectedGuide);
        } catch (error) {
            console.error('Error saving guide:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Tour Guide</h2>
            <select onChange={(e) => setSelectedGuide(JSON.parse(e.target.value))}>
                <option value="">Select a Guide</option>
                {tourGuides.map(guide => (
                    <option key={guide.id} value={JSON.stringify(guide)}>{guide.name}</option>
                ))}
            </select>

            {selectedGuide && (
                <form className="space-y-4" onSubmit={handleEditGuideSave}>
                    <input type="text" name="name" value={selectedGuide.name} onChange={handleEditGuideChange} placeholder="Name" required />
                    <input type="email" name="email" value={selectedGuide.email} onChange={handleEditGuideChange} placeholder="Email" required />
                    <input type="text" name="phoneNumber" value={selectedGuide.phoneNumber} onChange={handleEditGuideChange} placeholder="Phone Number" />
                    <input type="number" name="experienceYears" value={selectedGuide.experienceYears} onChange={handleEditGuideChange} placeholder="Experience Years" />
                    <select name="availabilityStatus" value={selectedGuide.availabilityStatus} onChange={handleEditGuideChange}>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default EditTourGuide;
