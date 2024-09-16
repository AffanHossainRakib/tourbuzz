// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tours from './pages/Tours';
import LoginSignup from './pages/LoginSignup';
import './index.css'; // Import Tailwind styles

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/login-signup" element={<LoginSignup />} />

                    {/* Add more routes here as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
