import { useState } from "react";
import axios from "axios";

function GamePage() {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImage, setGameImage] = useState(null);
  const [timeRange, setTimeRange] = useState({ starttime: "", endtime: "" });
  const [tasks, setTasks] = useState([{ type: "location", taskname: "", taskdescription: "", details: {} }]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGameImage(URL.createObjectURL(file));
    }
  };

  const handleTimeChange = (field, value) => {
    setTimeRange((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTask = () => {
    setTasks([...tasks, { type: "location", taskname: "", taskdescription: "", details: {} }]);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleTaskDetailsChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].details[field] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = async () => {

    if (!gameName.trim()) {
      alert("Game Name is required.");
      return;
    }

    if (!gameDescription.trim()) {
      alert("Game Description is required.");
      return;
    }

    if (!gameImage) {
      alert("Game Cover Image is required.");
      return;
    }

    if (!timeRange.starttime || !timeRange.endtime) {
      alert("Both start time and end time are required.");
      return;
    }

    if (new Date(timeRange.endtime) <= new Date(timeRange.starttime)) {
      alert("End time must be after start time.");
      return;
    }

    for (const [index, task] of tasks.entries()) {
      if (!task.taskname.trim()) {
        alert(`Task ${index + 1}: Task Name is required.`);
        return;
      }

      if (!task.taskdescription.trim()) {
        alert(`Task ${index + 1}: Task Description is required.`);
        return;
      }

      switch (task.type) {
        case "location":
          if (!task.details.coordinates || !task.details.radius) {
            alert(`Task ${index + 1}: Location tasks require coordinates and radius.`);
            return;
          }
          break;
        case "image":
          if (!task.details.url) {
            alert(`Task ${index + 1}: Image tasks require an image URL.`);
            return;
          }
          break;
        case "question":
          if (!task.details.questionText || !task.details.answer) {
            alert(`Task ${index + 1}: Question tasks require a question text and an answer.`);
            return;
          }
          break;
        default:
          alert(`Task ${index + 1}: Unknown task type.`);
          return;
      }
    }

    const gameData = {
      GameTitle: gameName,
      Description: gameDescription,
      TimeRanges: [timeRange], // Single time range array
      tasks: tasks.map(({ type, taskname, taskdescription, details }) => ({
        type,
        taskname,
        taskdescription,
        [type]: details, // Include the type-specific details
      })),
    };

    console.log(gameData);

    const token = localStorage.getItem("usersdatatoken");
    try {
      const response = await axios.post("/api/create-game", gameData,
        {
          headers: {
            authorization: token
          }
        });
      console.log("Game created:", response.data);
      alert("Game created successfully!");
    } catch (error) {
      console.error("Failed to create game:", error);
      alert("Failed to create game.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 space-y-8">
      <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-20">
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-500">
          Create a New Game
        </h1>

        {/* Game Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Game Name
          </label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        {/* Game Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Game Description
          </label>
          <textarea
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        {/* Game Cover Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Game Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-gray-300 bg-gray-700 p-2 rounded-md"
          />
          {gameImage && <img src={gameImage} alt="Game Cover" className="mt-4 h-48 rounded-md" />}
        </div>

        {/* Time Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Game Time Range
          </label>
          <input
            type="datetime-local"
            value={timeRange.starttime}
            onChange={(e) => handleTimeChange("starttime", e.target.value)}
            min={new Date().toISOString().slice(0, 16)} // Restrict to current and future
            className="w-full mb-2 px-4 py-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="datetime-local"
            value={timeRange.endtime}
            onChange={(e) => handleTimeChange("endtime", e.target.value)}
            min={timeRange.starttime || new Date().toISOString().slice(0, 16)} // End time should be after start time
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        {/* Task Management */}
        {tasks.map((task, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task {index + 1}
            </label>
            <select
              value={task.type}
              onChange={(e) => handleTaskChange(index, "type", e.target.value)}
              className="w-full mb-2 px-4 py-2 bg-gray-700 text-white rounded-md"
            >
              <option value="location">Location</option>
              <option value="image">Image</option>
              <option value="question">Question</option>
            </select>
            <input
              type="text"
              placeholder="Task Name"
              value={task.taskname}
              onChange={(e) => handleTaskChange(index, "taskname", e.target.value)}
              className="w-full mb-2 px-4 py-2 bg-gray-700 text-white rounded-md"
            />
            <textarea
              placeholder="Task Description"
              value={task.taskdescription}
              onChange={(e) => handleTaskChange(index, "taskdescription", e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            />

            {/* Task-specific Inputs */}
            {task.type === "location" && (
              <>
                <input
                  type="text"
                  placeholder="Coordinates"
                  onChange={(e) => handleTaskDetailsChange(index, "coordinates", e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-md"
                />
                <input
                  type="number"
                  placeholder="Radius"
                  onChange={(e) => handleTaskDetailsChange(index, "radius", e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-md"
                />
              </>
            )}
            {task.type === "image" && (
              <input
                type="url"
                placeholder="Image URL"
                onChange={(e) => handleTaskDetailsChange(index, "url", e.target.value)}
                className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-md"
              />
            )}
            {task.type === "question" && (
              <>
                <input
                  type="text"
                  placeholder="Question Text"
                  onChange={(e) => handleTaskDetailsChange(index, "questionText", e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-md"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  onChange={(e) => handleTaskDetailsChange(index, "answer", e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-gray-700 text-white rounded-md"
                />
              </>
            )}
          </div>
        ))}
        <button onClick={handleAddTask} className="mb-4 text-yellow-500">
          + Add Task
        </button>

        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-4 font-semibold rounded-md bg-yellow-500 hover:bg-yellow-400 text-gray-900"
        >
          Save Game
        </button>
      </div>
    </div>
  );
}

export default GamePage;
