// src/App.js
import React from 'react';
import './index.css'; // Import Tailwind styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tours from './pages/Tours';
import LoginSignup from './pages/LoginSignup';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';
import PaymentPage from './pages/PaymentPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/authentication" element={<LoginSignup />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                    {/* Add more routes here as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
