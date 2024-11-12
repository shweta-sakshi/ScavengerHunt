import { useState, useRef, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { useParams } from "react-router-dom";
import axios from "axios";

const GameDescription = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [taskAnswer, setTaskAnswer] = useState("");
  //Variable for map.
  const mapRef = useRef(null);         // Reference for map container div
  const mapInstance = useRef(null);    // Reference to store the map instance
  const markerRef = useRef(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    axios
      .get(`/api/game/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("usersdatatoken"),
        },
      })
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch game data:", err);
      });
  }, [id]);

  const openDialog = (index) => {
    setSelectedTaskIndex(index);
    setShowDialog(true);
    setTaskAnswer("");
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedTaskIndex(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const watcher = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,     // Improves accuracy but may impact performance
      maximumAge: 0,                // Prevents caching of old positions
      timeout: 5000                 // Maximum wait time for a location response
    });

    return () => {
      navigator.geolocation.clearWatch(watcher); // Clean up watcher on component unmount
    };
  }, []);

  useEffect(() => {
    // Ensure mapRef is available before initializing the map
    if (mapRef.current && location.lat && location.lng && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([location.lat, location.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      markerRef.current = L.marker([location.lat, location.lng], { title: 'Your Location' }).addTo(mapInstance.current);
    } else if (mapInstance.current && markerRef.current) {
      // Update marker position if location changes
      markerRef.current.setLatLng([location.lat, location.lng]);
      mapInstance.current.setView([location.lat, location.lng], 13);
    }
  }, [location]);  // Run when location changes


  const handleSubmitAnswer = () => {
    const task = game.tasks[selectedTaskIndex];

    switch (task.type) {
      case "location":
        if (location) {
          alert(`Selected location: ${JSON.stringify(location)}`);
        } else {
          alert("Please select a location on the map.");
        }
        break;

      case "image":
        if (taskAnswer.trim()) {
          alert(`Image URL submitted: ${taskAnswer}`);
        } else {
          alert("Please provide an image URL.");
        }
        break;

      case "question":
        if (taskAnswer.trim()) {
          alert(`Answer submitted: ${taskAnswer}`);
        } else {
          alert("Please provide an answer.");
        }
        break;

      default:
        alert("Unknown task type.");
    }

    closeDialog();
  };

  if (!game) return <p>Loading game data...</p>;

  return (
    <div className="bg-gray-900 h-screen text-white flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-yellow-500 text-center">
            {game.GameTitle}
          </h1>
          <p className="mt-4">{game.Description}</p>

          {game.tasks.map((task, index) => (
            <div key={index} className="mt-6">
              <h3 className="text-xl text-yellow-500">{task.taskname}</h3>
              <p>{task.taskdescription}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => openDialog(index)}
              >
                Submit Answer
              </button>
            </div>
          ))}
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-700 p-6 rounded-lg w-96">
            <h3 className="text-xl text-yellow-500 mb-4">Submit Answer</h3>

            {game.tasks[selectedTaskIndex]?.type === "location" && (
              <div>
                <p className="text-sm text-gray-400 mb-2">You Are Here!!!</p>
                <div
                  ref={mapRef}     // Use the ref to bind Leaflet to the div
                  id="map"
                  className="h-64 w-full mt-6 border border-gray-300 rounded-md"
                />
              </div>
            )}

            {game.tasks[selectedTaskIndex]?.type === "image" && (
              <input
                type="url"
                placeholder="Enter image URL"
                value={taskAnswer}
                onChange={(e) => setTaskAnswer(e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 rounded mb-4"
              />
            )}

            {game.tasks[selectedTaskIndex]?.type === "question" && (
              <input
                type="text"
                placeholder="Enter your answer"
                value={taskAnswer}
                onChange={(e) => setTaskAnswer(e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 rounded mb-4"
              />
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAnswer}
                className="px-4 py-2 bg-green-500 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDescription;
