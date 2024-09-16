import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="flex w-full max-w-5xl h-[500px]"> {/* Set fixed height here */}
        {/* Left Text Panel */}
        <div className="w-1/2 p-8 bg-blue-500 bg-opacity-80 backdrop-blur-md rounded-l-lg flex flex-col justify-center items-center relative overflow-hidden h-full"> {/* Ensure full height */}
          {/* Background Image */}
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
        <div className="w-1/2 flex justify-center items-center p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-r-lg transition duration-500 h-full"> {/* Ensure full height */}
          <div className="w-full max-w-md">
            {/* Login Form */}
            {isLogin && (
              <div className="transition-opacity duration-500 h-auto"> {/* Set auto height */}
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Sign In
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
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
              <div className="transition-opacity duration-500 h-auto"> {/* Set auto height */}
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Sign Up
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
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
