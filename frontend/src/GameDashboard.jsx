import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGamelistdata } from "./contextProvider/Gamecontext"

const GameDashboard = () => {
  //for time calculation:
  const calculateDuration = (TimeRanges) => {
    const { starttime, endtime } = TimeRanges[0]
    const now = new Date();
    const start = new Date(starttime);
    const end = new Date(endtime);

    if (isNaN(start) || isNaN(end)) {
      console.error("Invalid date:", { starttime, endtime });
      return { days: 0, hours: 0, minutes: 0, seconds: 0, label: "Invalid" };
    }

    let difference, label;

    if (now < start) {
      // Before start time
      difference = start - now;
      label = "Starts in";
    } else if (now >= start && now < end) {
      // Between start and end time
      difference = end - now;
      label = "Ends in";
    } else {
      // After end time
      return { days: 0, hours: 0, minutes: 0, seconds: 0, label: "Ended" };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      label,
    }
  };

  const openGame = (id) => {

  }

  const { games, data } = useGamelistdata();
  console.log(games);

  const [gameId, setGameId] = useState("");
  const handleJoinGame = () => {
    alert(`Joining game with ID: ${gameId}`);
    setGameId("");
  };

  return (
    { data } ? (
      <div className="bg-gray-900 min-h-screen text-white p-8 space-y-8">
        {/* Joined Games Section */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Games To Play</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map((game) => {
              const { label, days, hours, minutes, seconds } = calculateDuration(
                game.TimeRanges
              )
              return (
                <div
                  key={game._id}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col"
                >
                  {/* Game Image */}
                  <img
                    src={game.profileImageUrl}
                    alt="image"
                    className="h-48 w-full object-cover"
                  />
                  {/* Game Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{game.GameTitle}</h3>
                      <p className="text-sm text-gray-400">{label}: {days}d {hours}h {minutes}m {seconds}s</p>
                    </div>
                    <Link
                      to={`/gameDiscription/${game._id}`}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white mt-4"
                    >
                      Play
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
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
    ) : (
      <div>No Game to play</div>
    )
  );
};

export default GameDashboard;
