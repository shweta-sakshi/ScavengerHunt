import React, { useState } from "react";
import { useGamelistdata } from "./contextProvider/Gamecontext"

const GameDescription = () => {
  const [level, setLevel] = useState(1);
  const [solution, setSolution] = useState(""); // User's input solution

  const { games, data } = useGamelistdata();
  console.log(games);
  
  const gameData = {
    name: "Mystic Adventure",
    description:
      "Embark on a journey through enchanted forests and mystical lands to complete the ultimate challenge.",
    levels: {
      1: {
        task: "Take a photo of the library",
        duration: "1 hour",
        type: "image",
        taskdescription: "Capture a clear photo of the library's front view.",
        image: {
          url: "https://example.com/library.jpg",
        },
      },
      2: {
        task: "Find the hidden treasure near the old oak tree",
        duration: "1.5 hours",
        type: "location",
        taskdescription: "Find the hidden treasure near the ancient oak tree.",
        location: {
          coordinates: [40.7128, -74.0060],
          radius: 100,
        },
      },
      3: {
        task: "Solve the riddle at the mountain peak",
        duration: "2.5 hours",
        type: "question",
        taskdescription: "Solve the riddle given at the mountain peak.",
        question: {
          questionText: "What has keys but can't open locks?",
          answer: "Piano",
        },
      },
    },
  };

  const currentTask = gameData.levels[level];

  const submitSolution = async () => {
    try {
      const response = await fetch("/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          gameId: "game123", // Example gameId
          taskId: level,
          solution: solution,
        }),
      });

      if (response.ok) {
        alert("Solution submitted successfully!");
        setSolution(""); // Clear input after submission
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSolution(file); // Save file as solution
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">
          {gameData.name}
        </h1>
        <p className="text-gray-300 mb-6 text-center">{gameData.description}</p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2 text-center">
            Task: {currentTask.task}
          </h2>
          <p className="text-gray-300 text-center">{currentTask.taskdescription}</p>
        </div>

        {/* Task Type Dynamic Form */}
        <div className="mb-6">
          {currentTask.type === "image" && (
            <div>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              <p className="text-gray-400">Upload an image for the task.</p>
            </div>
          )}

          {currentTask.type === "location" && (
            <div>
              <label className="text-gray-400 block">Enter Coordinates:</label>
              <input
                type="text"
                placeholder="Latitude, Longitude"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded-lg"
              />
            </div>
          )}

          {currentTask.type === "question" && (
            <div>
              <label className="text-gray-400 block">Answer:</label>
              <input
                type="text"
                placeholder="Your answer"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Level Controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setLevel((prev) => Math.max(1, prev - 1))}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Previous
          </button>
          <p className="text-gray-400">Level {level}</p>
          <button
            onClick={() => setLevel((prev) => Math.min(3, prev + 1))}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>

        <button
          onClick={submitSolution}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold mt-4"
        >
          Submit Solution
        </button>
      </div>
    </div>
  );
};

export default GameDescription;
