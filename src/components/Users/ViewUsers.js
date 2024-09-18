import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetUsers`);
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;
    
        try {
            const response = await axios.post(`${serverBaseUrl}/DeleteUser`, { id: userId });
            alert(response.data.message);  // Show success message
            fetchUsers();  // Refresh the list of users after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user.');
        }
    };
    

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Management</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-blue-500 text-center mb-4">Loading users...</p>}

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search Users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            {/* User List */}
            <ul className="space-y-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li key={user.id} className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default ViewUsers;
