import React from "react";
import { Link } from "react-router-dom";

function LandingPage2() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">She Knows!</h1>
        <p className="text-lg mb-6">
          Within the vibrant and sprawling landscape of a college campus, there
          are countless hidden spots, student traditions, and untold stories
          waiting to be discovered. And she knows all of them. Can you beat her?
        </p>
        <p className="text-lg mb-6">
          Whether it's finding a hidden piece of art in the library, solving a
          riddle that leads to a historic landmark on campus, or learning fun
          facts about your college. This adventure is about teamwork, friendly
          competition, and exploring your college in ways you never have before.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage2;
