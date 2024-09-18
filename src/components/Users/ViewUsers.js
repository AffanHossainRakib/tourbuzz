import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${serverBaseUrl}/GetUsers`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`${serverBaseUrl}/DeleteUser/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <input
                type="text"
                placeholder="Search Users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-700 text-white"
            />
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
                        <div>
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                        <button
                            className="text-sm bg-red-600 text-white px-3 py-1 rounded-full"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewUsers;
