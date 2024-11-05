import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/path/to/your/landing-bg.jpg')` }}
    >
      <div className="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="GameZone Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold">Welcome to GameZone</h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-300">
          Join the ultimate gaming community! Sign up to get started or log in if you’re already a member.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-6 justify-center">
          {/* Sign Up Button */}
          <Link to="/register">
            <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 font-semibold text-lg">
              Sign Up
            </button>
          </Link>
          
          {/* Sign In Button */}
          <Link to="/login">
            <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-gray-800 hover:bg-gray-700 font-semibold text-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
