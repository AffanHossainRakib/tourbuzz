import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MediaOverlay = ({ onSelect, onClose }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch media files from the server
        const fetchMediaFiles = async () => {
            try {
                const response = await axios.get('http://localhost:5001/GetMediaFiles');
                setMediaFiles(response.data.files);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching media files:', error);
                setLoading(false);
            }
        };

        fetchMediaFiles();
    }, []);

    // Prevent clicks inside the modal from closing the overlay
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    if (loading) {
        return <div>Loading media files...</div>;
    }

    return (
        <div
            className="media-overlay fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50"
            onClick={onClose} // Clicking outside the modal closes it
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-screen overflow-y-auto"
                onClick={stopPropagation} // Prevent closing when clicking inside the modal
            >
                <h2 className="text-2xl font-bold mb-4">Select Media</h2>
                <div className="grid grid-cols-3 gap-4">
                    {mediaFiles.map((file, index) => (
                        <div key={index} className="media-file">
                            <img
                                src={`../../assets/tours/${file}`}
                                alt={file}
                                className="w-full h-auto cursor-pointer"
                                onClick={() => onSelect(file)} // Select media file
                            />
                            <p className="text-center mt-2">{file}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                    onClick={onClose} // Close button to manually close the modal
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MediaOverlay;
