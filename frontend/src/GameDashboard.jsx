import React, { useState } from "react";
import { Link } from "react-router-dom";

const GameDashboard = () => {
  const joinedGames = [
    { id: 1, name: "Mystic Quest", deadline: "2024-11-15", status: "Playing" },
    {
      id: 2,
      name: "Adventure Race",
      deadline: "2024-12-01",
      status: "Completed",
    },
  ];

  const [gameId, setGameId] = useState("");

  const handleJoinGame = () => {
    alert(`Joining game with ID: ${gameId}`);
    setGameId("");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 space-y-8">
      {/* Joined Games Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Joined Games</h2>
        {joinedGames.map((game) => (
          <div
            key={game.id}
            className="mb-4 p-4 bg-gray-700 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{game.name}</h3>
              <p className="text-sm text-gray-400">Deadline: {game.deadline}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white">
              {game.status === "Playing" ? "Play" : "View"}
            </button>
          </div>
        ))}
      </div>

      {/* Join a Game Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Join a Game</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={handleJoinGame}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white"
          >
            Join
          </button>
        </div>
      </div>

      {/* Create a Game Section */}
      <div className="flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Want to Start a New Game?
          </h2>
          <p className="text-gray-400 mb-6">
            Click below to create a customized game for you and your friends!
          </p>
          <Link
            to="/gamePage"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold transition-colors"
          >
            Create Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;
