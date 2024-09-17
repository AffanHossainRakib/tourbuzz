// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user && user.userType === 'admin' ? children : <Navigate to="/authentication" />;
};

export default AdminRoute;
