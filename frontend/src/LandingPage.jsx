import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/path/to/your/landing-bg.jpg')` }}
    >
      <div className="bg-gray-900 bg-opacity-75 p-12 md:p-16 lg:p-20 rounded-lg shadow-2xl max-w-4xl w-full text-center space-y-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="GameZone Logo"
            className="h-16 w-auto lg:h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">Welcome to GameZone</h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
          Join the ultimate gaming community! Sign up to get started or log in if you’re already a member.~
        </p>

        {/* Call-to-Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-8 justify-center">
          {/* Sign Up Button */}
          <Link to="/register">
            <button className="w-full sm:w-auto px-8 py-4 lg:px-10 lg:py-5 rounded-md bg-indigo-600 hover:bg-indigo-500 font-semibold text-lg lg:text-xl">
              Sign Up
            </button>
          </Link>
          
          {/* Sign In Button */}
          <Link to="/login">
            <button className="w-full sm:w-auto px-8 py-4 lg:px-10 lg:py-5 rounded-md bg-gray-800 hover:bg-gray-700 font-semibold text-lg lg:text-xl">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
