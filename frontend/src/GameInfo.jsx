import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const gameTitle = "Adventure Quest";
const gameDescription =
  "Embark on an epic journey through mystical lands to find the lost treasure!";
const gameTimes = ["10:00 AM", "5:00 PM"];

const GameInfo = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = `Task ${tasks.length + 1}`;
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="p-6 bg-gray-800 text-white max-w-lg mx-auto rounded-lg shadow-lg mt-20">
      <div className=" ">
        <h1 className="text-2xl font-bold mb-2 ">{gameTitle}</h1>
        <p className="text-gray-300 mb-4">{gameDescription}</p>
        <div className="text-sm text-gray-400 mb-4">
          <p>Start Time: {gameTimes[0]}</p>
          <p>End Time: {gameTimes[1]}</p>
        </div>
        <button
          onClick={addTask}
          className="flex items-center px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Task
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <ul className="list-disc list-inside mt-2 text-gray-200">
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
