import { useState } from 'react';
import './App.css';

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
        <div className="game-page">
            <h1>Welcome to Your Scavenger Hunt Game</h1>

            <div className="form-group">
                <label htmlFor="gameName">Game Name</label>
                <input
                    type="text"
                    id="gameName"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Enter game name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="gameDescription">Game Description</label>
                <textarea
                    id="gameDescription"
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    placeholder="Describe your game"
                />
            </div>

            <div className="form-group">
                <label htmlFor="gameImage">Upload Game Cover Image</label>
                <input
                    type="file"
                    id="gameImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {gameImage && (
                    <div className="image-preview">
                        <img src={gameImage} alt="Game Cover" />
                    </div>
                )}
            </div>

            <button
                className="start-game-button"
                onClick={handleStartGame}
                disabled={!isFormComplete}
            >
                Start Game
            </button>
        </div>
    );
}

export default GamePage;
