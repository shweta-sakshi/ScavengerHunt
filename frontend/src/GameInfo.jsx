import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const gameTitle = "Adventure Quest";
const gameDescription =
  "Embark on an epic journey through mystical lands to find the lost treasure!";
const gameTimes = ["10:00 AM", "5:00 PM"];

const GameInfo = () => {
  const {gid} = useParams()
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = `Task ${tasks.length + 1}`;
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-6">
        <h1 className="text-3xl font-bold mb-2 text-yellow-500">{gameTitle}</h1>
        <p className="text-gray-300 mb-4 text-lg">{gameDescription}</p>

        {/* Game Times */}
        <div className="text-sm text-gray-400 mb-6">
          <p>Start Time: {gameTimes[0]}</p>
          <p>End Time: {gameTimes[1]}</p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={addTask}
          className="flex items-center px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors mb-4"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Task
        </button>

        {/* Tasks List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">Tasks</h2>
          <ul className="list-disc list-inside mt-2 text-gray-200 space-y-2">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
