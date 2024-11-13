import { useState, useRef, useEffect } from "react";
import axios from "axios";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import NavGame from "./NavGame";
const socket = io('http://localhost:3000'); // Backend URL

function GamePage() {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImage, setGameImage] = useState(null);
  const [timeRange, setTimeRange] = useState({ starttime: "", endtime: "" });
  const [tasks, setTasks] = useState([{ type: "location", taskname: "", taskdescription: "", details: {} }]);
  const mapRef = useRef(null);         // Reference for map container div
  const mapInstance = useRef(null);    // Reference to store the map instance
  const markerRef = useRef(null);
  const [location, setLocation] = useState(null);

  // 1. Request permission on page load
  document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  });


  useEffect(() => {
    // Listen for 'newGameCreated' event
    socket.on('newGameCreated', ({ game }) => {
      console.log('New game received:', game);
      if (Notification.permission === "granted") {
        // Listen for 'newGameCreated' event
        socket.on('newGameCreated', ({ game }) => {
          new Notification("New Game Created!", {
            body: `Check out the new game: ${game.GameTitle}`,
            icon: `${game.profileImageUrl}`, // Add a relevant icon path if available
          });
        });
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('newGameCreated');
    };
  }, []);

  // Define the target location coordinates
  const targetLocation = { lat: 25.492790797117006, lng: 81.86678711533234 };  // Replace with your specific location
  const tolerance = 0.005;  // Tolerance range in degrees for user selection
  let index;
  const handleindex = (it) => { index = it }
  useEffect(() => {
    if (mapInstance.current) return; // If map already initialized, do nothing

    mapInstance.current = L.map(mapRef.current).setView([25.492500268646676, 81.86358907095727], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    markerRef.current = L.marker([targetLocation.lat, targetLocation.lng], {
      title: 'Select this location'
    }).addTo(mapInstance.current);

    mapInstance.current.on('click', (e) => {
      console.log(e);
      const { lat, lng } = e.latlng;
      handleTaskDetailsChange(index, "coordinates", e.latlng)
      // Remove the existing marker
      if (markerRef.current) {
        mapInstance.current.removeLayer(markerRef.current);
      }

      // Add a new marker
      if (Math.abs(lat - targetLocation.lat) <= tolerance && Math.abs(lng - targetLocation.lng) <= tolerance) {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current);
        setLocation({ lat, lng }); // Save the lat/lng
        alert('Location selected successfully!');
      } else {
        alert('Please click closer to the designated location.');
      }
    });
  }, [markerRef.current]);

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

    const formData = new FormData();
    formData.append("GameTitle", gameName);
    formData.append("Description", gameDescription);
    formData.append("profileImageUrl", document.querySelector('input[type="file"]').files[0]); // Add the actual file

    formData.append("TimeRanges", JSON.stringify([timeRange]));
    formData.append(
      "tasks",
      JSON.stringify(
        tasks.map(({ type, taskname, taskdescription, details }) => ({
          type,
          taskname,
          taskdescription,
          [type]: details, // Include the type-specific details
        }))
      )
    );

    const token = localStorage.getItem("usersdatatoken");
    try {
      const response = await axios.post("/api/create-game", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
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
    <>
      <NavGame />
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
                  <div
                    ref={mapRef}     // Use the ref to bind Leaflet to the div
                    id="map"
                    onChange={handleindex(index)}
                    className="h-64 w-full mt-6 border border-gray-300 rounded-md"
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
    </>
  );
}

export default GamePage;
