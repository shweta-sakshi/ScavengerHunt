import React, { useState } from "react";

const GameDashboard = () => {
  // Sample data for joined games
  const joinedGames = [
    { id: 1, name: "Mystic Quest", deadline: "2024-11-15", status: "Playing" },
    {
      id: 2,
      name: "Adventure Race",
      deadline: "2024-12-01",
      status: "Completed",
    },
  ];

  const [gameId, setGameId] = useState(""); // State for game ID input
  const [tasks, setTasks] = useState([]); // State for tasks in Create Game
  const [newTask, setNewTask] = useState(""); // State for new task input

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  // Function to handle joining a game
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
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">
          Create a Game
        </h2>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Tasks</h3>
          <ul className="list-disc list-inside mb-4 text-gray-300">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none"
            />
            <button
              onClick={addTask}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;
