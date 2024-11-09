import React, { useState } from "react";

// Sample game data with different tasks and durations for each level
const gameData = {
  name: "Mystic Adventure",
  description:
    "Embark on a journey through enchanted forests and mystical lands to complete the ultimate challenge.",
  levels: {
    1: { task: "Take a photo of the library", duration: "1 hour" },
    2: {
      task: "Find the hidden treasure near the old oak tree",
      duration: "1.5 hours",
    },
    3: { task: "Collect 5 unique stones from the river", duration: "2 hours" },
    4: { task: "Solve the riddle at the mountain peak", duration: "2.5 hours" },
    5: { task: "Take a photo of the admin building", duration: "2 hours" },
    6: { task: "Find the golden key in the secret cave", duration: "3 hours" },
    7: {
      task: "Defeat the dragon guarding the treasure",
      duration: "3.5 hours",
    },
  },
};

const GameDescription = () => {
  const [level, setLevel] = useState(5); // Set initial level
  const [task, setTask] = useState(gameData.levels[level].task); // Initial task based on level
  const [duration, setDuration] = useState(gameData.levels[level].duration); // Initial duration based on level

  // Increment level
  const incrementLevel = () => {
    if (level < 7) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setTask(gameData.levels[newLevel].task); // Update task based on level
      setDuration(gameData.levels[newLevel].duration); // Update duration based on level
    }
  };

  // Decrement level
  const decrementLevel = () => {
    if (level > 1) {
      const newLevel = level - 1;
      setLevel(newLevel);
      setTask(gameData.levels[newLevel].task); // Update task based on level
      setDuration(gameData.levels[newLevel].duration); // Update duration based on level
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">
          {gameData.name}
        </h1>
        <p className="text-gray-300 mb-6 text-center">{gameData.description}</p>
        <p className="text-gray-300 mb-6 text-center">Task: {task}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-yellow-400">Duration</h2>
            <p className="text-gray-400">{duration}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-yellow-400">Level</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementLevel}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                -
              </button>
              <p className="text-gray-400">Level {level}</p>
              <button
                onClick={incrementLevel}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors">
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameDescription;
