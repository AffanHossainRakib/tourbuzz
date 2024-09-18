import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CreateTour from '../components/Tour/CreateTour';
import EditTour from '../components/Tour/EditTour';
import CreateTourGuide from '../components/TourGuide/CreateTourGuide';
import EditTourGuide from '../components/TourGuide/EditTourGuide';
import ViewUsers from '../components/Users/ViewUsers';
import ManageMedia from '../components/Media/ManageMedia';
import ViewBookings from '../components/Bookings/ViewBookings';
import { FaSuitcase, FaEdit, FaUserTie, FaUsers, FaCamera } from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('createTour');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/admin-dashboard-background.jpg')` }}
        >
            {/* Transparent Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Navbar />

            <div className="relative z-10 flex pt-32 p-8">
                {/* Left Panel */}
                <div className="w-64 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg h-fit flex-shrink-0">
                    <ul className="space-y-4">
                        <li className={`cursor-pointer ${activeTab === 'createTour' && 'bg-gray-700'}`} onClick={() => handleTabChange('createTour')}>
                            <FaSuitcase />
                            <span>Create Tour</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'editTour' && 'bg-gray-700'}`} onClick={() => handleTabChange('editTour')}>
                            <FaEdit />
                            <span>Edit Tour</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'createGuide' && 'bg-gray-700'}`} onClick={() => handleTabChange('createGuide')}>
                            <FaUserTie />
                            <span>Create Tour Guide</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'viewGuides' && 'bg-gray-700'}`} onClick={() => handleTabChange('editGuide')}>
                            <FaUsers />
                            <span>Edit Tour Guide</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'viewUsers' && 'bg-gray-700'}`} onClick={() => handleTabChange('viewUsers')}>
                            <FaUsers />
                            <span>View Users</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'manageMedia' && 'bg-gray-700'}`} onClick={() => handleTabChange('manageMedia')}>
                            <FaCamera />
                            <span>Manage Media</span>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-grow ml-6">
                    {activeTab === 'createTour' && <CreateTour />}
                    {activeTab === 'editTour' && <EditTour />}
                    {activeTab === 'createGuide' && <CreateTourGuide />}
                    {activeTab === 'editGuide' && <EditTourGuide />}
                    {activeTab === 'viewUsers' && <ViewUsers />}
                    {activeTab === 'manageMedia' && <ManageMedia />}
                    {activeTab === 'viewBookings' && <ViewBookings />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
