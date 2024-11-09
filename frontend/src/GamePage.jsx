import { useState } from "react";

function GamePage() {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImage, setGameImage] = useState(null);

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGameImage(URL.createObjectURL(file));
    }
  };

  // Check if all fields are filled out
  const isFormComplete = gameName && gameDescription && gameImage;

  // Handle start game button click
  const handleStartGame = () => {
    alert("Get ready! Your scavenger hunt game is starting.");
    // Here, you could navigate to the game play page, or start the game logic
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-center mb-6 text-yellow-500">
        Welcome to Your Scavenger Hunt Game
      </h1>

      <div className="mb-4">
        <label
          htmlFor="gameName"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Game Name
        </label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Enter game name"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gameDescription"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Game Description
        </label>
        <textarea
          id="gameDescription"
          value={gameDescription}
          onChange={(e) => setGameDescription(e.target.value)}
          placeholder="Describe your game"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none resize-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gameImage"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Upload Game Cover Image
        </label>
        <input
          type="file"
          id="gameImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-gray-300 bg-gray-700 p-2 rounded-md"
        />
        {gameImage && (
          <div className="mt-4">
            <img
              src={gameImage}
              alt="Game Cover"
              className="max-w-full h-48 rounded-lg border-2 border-yellow-500 shadow-lg"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleStartGame}
        disabled={!isFormComplete}
        className={`w-full py-2 mt-4 font-semibold rounded-md text-gray-900 
                    ${
                      isFormComplete
                        ? "bg-yellow-500 hover:bg-yellow-400"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
      >
        Start Game
      </button>
    </div>
  );
}

export default GamePage;
