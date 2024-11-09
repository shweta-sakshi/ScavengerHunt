import React from "react";

// Sample game data
const gameData = {
  name: "Mystic Adventure",
  description:
        "Embark on a journey through enchanted forests and mystical lands to complete the ultimate challenge.",
  task:"This time you have to take photo of admin building",
  duration: "2 hours",
  level: 5,
};

const GameDescription = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">{gameData.name}</h1>
        <p className="text-gray-300 mb-6 text-center">{gameData.description}</p>
        <p className="text-gray-300 mb-6 text-center">Task : {gameData.task}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Duration</h2>
            <p className="text-gray-400">{gameData.duration}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Level</h2>
            <p className="text-gray-400">Level {gameData.level}</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameDescription;
