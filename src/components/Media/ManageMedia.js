import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMedia = () => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        loadMediaFiles();
    }, []);

    const loadMediaFiles = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetMediaFiles`);
            const files = response.data.files.filter(file => !file.startsWith('.')); // Filter hidden files
            setMediaFiles(files);
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    };

    const handleImageClick = (file) => {
        setSelectedImage(`/assets/tours/${file}`);
    };

    const closeOverlay = () => {
        setSelectedImage(null);
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Media</h2>

            {/* Media Grid */}
            <div className="grid grid-cols-4 gap-4 mt-4">
                {mediaFiles.map((file, index) => (
                    <div key={index} className="relative cursor-pointer">
                        <img
                            src={`/assets/tours/${file}`}
                            alt={`media-${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                            onClick={() => handleImageClick(file)}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay for viewing selected image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
                    onClick={closeOverlay}
                >
                    <div className="bg-white p-2 rounded-lg" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Full size media"
                            className="max-w-xs max-h-xs md:max-w-sm md:max-h-sm lg:max-w-lg lg:max-h-lg rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMedia;
