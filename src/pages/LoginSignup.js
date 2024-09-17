// src/components/LoginSignup.js
import React, { useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  // Base URL for the backend server, using environment variable
  const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverBaseUrl}/Login`, { email, password });
      if (response.data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          email,
          userType: response.data.user_type,
        }));

        // Reset the form state
        setEmail('');
        setPassword('');

        // Redirect based on user type
        if (response.data.user_type === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  // Handle form submission for signup
// src/components/LoginSignup.js

const handleSignup = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post(`${serverBaseUrl}/CreateUser`, { name: fullName, email, password });
      if (response.data.success) {
          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify({
              email,
              userType: 'user', // Defaulting to 'user' for the front-end
          }));

          // Reset the form state
          setFullName('');
          setEmail('');
          setPassword('');

          // Redirect to dashboard upon successful signup
          navigate('/dashboard');
      } else {
          alert(response.data.message || 'Signup failed.');
      }
  } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'An error occurred during signup.');
  }
};


  return (
    <div 
      className="flex items-center justify-center min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/pages/auth.jpg')` }}
    >
      {/* Transparent Overlay Layer */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Circular Back Button */}
      <button
        onClick={() => navigate(-1)} // Go to the previous page
        className="absolute top-8 left-8 p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-opacity-90 transition duration-300 z-20"
      >
        <FaArrowLeft size={20} />
      </button>

      <div className="flex w-full max-w-5xl h-[500px] relative z-10">
        {/* Left Text Panel */}
        <div className="w-1/2 p-8 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-l-lg flex flex-col justify-center items-center relative overflow-hidden h-full">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/assets/sliders/slider3.jpg)' }}></div>

          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? "Welcome Back!" : "Join Us Today!"}
            </h2>
            <p className="text-lg">
              {isLogin
                ? "Sign in to access your account."
                : "Sign up to create an account and explore more!"}
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-1/2 flex justify-center items-center p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-r-lg transition duration-500 h-full">
          <div className="w-full max-w-md">
            {/* Login Form */}
            {isLogin && (
              <div className="transition-opacity duration-500 h-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Sign In
                </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </form>
                <button
                  onClick={() => setIsLogin(false)}
                  className="w-full mt-4 text-blue-600 hover:underline"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            )}

            {/* Signup Form */}
            {!isLogin && (
              <div className="transition-opacity duration-500 h-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Sign Up
                </h2>
                <form className="space-y-4" onSubmit={handleSignup}>
                  <div>
                    <label className="block mb-1 text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </form>
                <button
                  onClick={() => setIsLogin(true)}
                  className="w-full mt-4 text-blue-600 hover:underline"
                >
                  Already have an account? Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
