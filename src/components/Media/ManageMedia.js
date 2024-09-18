import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMedia = () => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        loadMediaFiles();
    }, []);

    const loadMediaFiles = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetMediaFiles`);
            setMediaFiles(response.data.files);
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    };

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file, i) => formData.append(`file_${i}`, file));

        try {
            await axios.post(`${serverBaseUrl}/UploadMedia`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            loadMediaFiles();
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Media</h2>
            <input type="file" onChange={handleMediaUpload} multiple />
            <div className="grid grid-cols-4 gap-4 mt-4">
                {mediaFiles.map((file, index) => (
                    <div key={index} className="relative">
                        <img src={`/assets/tours/${file}`} alt={`media-${index}`} className="w-full h-32 object-cover rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMedia;
