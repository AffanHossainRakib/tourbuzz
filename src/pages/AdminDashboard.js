import React, { useState } from 'react';
import CreateTour from '../components/Tour/CreateTour';
import EditTour from '../components/Tour/EditTour';
import CreateTourGuide from '../components/TourGuide/CreateTourGuide';
import EditTourGuide from '../components/TourGuide/EditTourGuide';
import ViewUsers from '../components/Users/ViewUsers';
import ManageMedia from '../components/Media/ManageMedia';
import ViewBookings from '../components/Bookings/ViewBookings';
import { FaSuitcase, FaEdit, FaUserTie, FaUsers, FaCamera, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('createTour');
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/assets/admin-dashboard-background.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex p-8">
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
                        <li className={`cursor-pointer ${activeTab === 'editGuide' && 'bg-gray-700'}`} onClick={() => handleTabChange('editGuide')}>
                            <FaUsers />
                            <span>Edit Tour Guide</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'viewBooking' && 'bg-gray-700'}`} onClick={() => handleTabChange('viewBooking')}>
                            <FaUsers />
                            <span>View Bookings</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'viewUsers' && 'bg-gray-700'}`} onClick={() => handleTabChange('viewUsers')}>
                            <FaUsers />
                            <span>View Users</span>
                        </li>
                        <li className={`cursor-pointer ${activeTab === 'manageMedia' && 'bg-gray-700'}`} onClick={() => handleTabChange('manageMedia')}>
                            <FaCamera />
                            <span>Manage Media</span>
                        </li>
                        <li className="cursor-pointer" onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow ml-6">
                    {activeTab === 'createTour' && <CreateTour />}
                    {activeTab === 'editTour' && <EditTour />}
                    {activeTab === 'createGuide' && <CreateTourGuide />}
                    {activeTab === 'editGuide' && <EditTourGuide />}
                    {activeTab === 'viewUsers' && <ViewUsers />}
                    {activeTab === 'manageMedia' && <ManageMedia />}
                    {activeTab === 'viewBooking' && <ViewBookings />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
