import React, { useState } from 'react';
import CreateTour from '../components/Tour/CreateTour';
import EditTour from '../components/Tour/EditTour';
import CreateTourGuide from '../components/TourGuide/CreateTourGuide';
import EditTourGuide from '../components/TourGuide/EditTourGuide';
import ViewUsers from '../components/Users/ViewUsers';
import ManageMedia from '../components/Media/ManageMedia';
import ViewBookings from '../components/Bookings/ViewBookings';
import ViewTransactions from '../components/Transactions/ViewTransactions';  
import { FaSuitcase, FaEdit, FaUserTie, FaUserEdit, FaUsers, FaCamera, FaMoneyCheck, FaSignOutAlt, FaBook, FaHome } from 'react-icons/fa'; 
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

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/assets/admin-dashboard-background.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex p-8">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 bg-opacity-90 backdrop-blur-md text-white p-6 rounded-lg h-fit flex-shrink-0">
                    <ul className="space-y-6">
                        <li
                            className="cursor-pointer flex items-center space-x-3 p-3 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                            onClick={handleHomeClick}
                        >
                            <FaHome />
                            <span>Home</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'createTour' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('createTour')}
                        >
                            <FaSuitcase />
                            <span>Create Tour</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'editTour' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('editTour')}
                        >
                            <FaEdit />
                            <span>Edit Tour</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'createGuide' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('createGuide')}
                        >
                            <FaUserTie />
                            <span>Create Tour Guide</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'editGuide' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('editGuide')}
                        >
                            <FaUserEdit />
                            <span>Edit Tour Guide</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'viewBooking' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('viewBooking')}
                        >
                            <FaBook />
                            <span>View Bookings</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'viewUsers' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('viewUsers')}
                        >
                            <FaUsers />
                            <span>View Users</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'manageMedia' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('manageMedia')}
                        >
                            <FaCamera />
                            <span>Manage Media</span>
                        </li>
                        <li
                            className={`cursor-pointer flex items-center space-x-3 p-3 rounded-md transition ${
                                activeTab === 'transactions' ? 'bg-indigo-600 font-semibold shadow-lg' : 'hover:bg-gray-700'
                            }`}
                            onClick={() => handleTabChange('transactions')}
                        >
                            <FaMoneyCheck />
                            <span>Transactions</span>  
                        </li>
                        <li
                            className="cursor-pointer flex items-center space-x-3 p-3 rounded-md bg-red-600 hover:bg-red-700 transition"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-grow ml-6">
                    {activeTab === 'createTour' && <CreateTour />}
                    {activeTab === 'editTour' && <EditTour />}
                    {activeTab === 'createGuide' && <CreateTourGuide />}
                    {activeTab === 'editGuide' && <EditTourGuide />}
                    {activeTab === 'viewUsers' && <ViewUsers />}
                    {activeTab === 'manageMedia' && <ManageMedia />}
                    {activeTab === 'viewBooking' && <ViewBookings />}
                    {activeTab === 'transactions' && <ViewTransactions />}  
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
