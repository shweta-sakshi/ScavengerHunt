import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavGame from "./NavGame";

const GameDashboard = () => {
  const calculateDuration = (TimeRanges) => {
    const { starttime, endtime } = TimeRanges[0];
    const now = new Date();
    const start = new Date(starttime);
    const end = new Date(endtime);

    if (isNaN(start) || isNaN(end)) {
      console.error("Invalid date:", { starttime, endtime });
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        label: "Invalid",
        duration: "Unknown",
      };
    }

    let difference, label;

    if (now < start) {
      difference = start - now;
      label = "Starts in";
    } else if (now >= start && now < end) {
      difference = end - now;
      label = "Ends in";
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        label: "Ended",
        duration: "Completed",
      };
    }

    const duration = end - start; // Calculate the duration between start and end time

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      label,
      duration: `${Math.floor(duration / (1000 * 60 * 60))} hours ${Math.floor(
        (duration / (1000 * 60)) % 60
      )} minutes`,
    };
  };

  //get all the game for this user to play.
  const [games, setgames] = useState();
  const [data, setdata] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("usersdatatoken");
    axios
      .get("/api/play-games", {
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
      })
      .then((res) => {
        setgames(res.data);
        setdata(true)
      })
      .catch((error) => {
        setdata(false);
        console.error("Error fetching games:", error);
      });
  }, [data]);

  const [gameId, setGameId] = useState("");
  const handleJoinGame = () => {
    alert(`Joining game with ID: ${gameId}`);
    setGameId("");
  };

  return data ? (
    <>
      <NavGame />
      <div className="bg-gray-900 min-h-screen text-white p-10 space-y-10 flex flex-col items-center">
        {/* Games To Play Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-screen-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-yellow-400 text-center tracking-wider">
            Games To Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {games.map((game) => {
              const { label, days, hours, minutes, seconds, duration } =
                calculateDuration(game.TimeRanges);
              return (
                <div
                  key={game._id}
                  className="bg-gray-700  rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl w-80"
                >
                  {/* Game Image */}
                  <div className=" m-2">
                    <img
                      src={game.profileImageUrl}
                      alt="game image"
                      className="h-48 w-full object-cover"
                    />
                    {/* Game Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {game.GameTitle}
                        </h3>
                        <p className="text-gray-400 mb-2">{game.Description}</p>
                        <p className="text-sm text-gray-300 font-light">
                          {label}:{" "}
                          <span className="font-medium text-yellow-300">
                            {days}d {hours}h {minutes}m {seconds}s
                          </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Duration: {duration}
                        </p>
                      </div>
                      <Link
                        to={`/gameDiscription/${game._id}`}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded-md text-white mt-4 font-semibold text-center"
                      >
                        Play
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join a Game Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-screen-lg">
          <h2 className="text-2xl font-extrabold mb-6 text-yellow-400 text-center tracking-wider">
            Join a Game
          </h2>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Enter Game ID"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
            />
            <button
              onClick={handleJoinGame}
              className="bg-green-500 hover:bg-green-600 transition duration-300 px-4 py-2 rounded-md text-white font-semibold"
            >
              Join
            </button>
          </div>
        </div>
        {/* This for game my game and create game button */}
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-screen-lg">
            {/* Create Games */}
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full">
                <h2 className="text-2xl font-extrabold text-yellow-400 mb-4 tracking-wider">
                  Want to Start a New Game?
                </h2>
                <p className="text-gray-400 mb-6">
                  Click below to create a customized game for you and your friends!
                </p>
                <Link
                  to="/gamePage"
                  className="bg-blue-500 hover:bg-blue-600 transition duration-300 px-6 py-3 rounded-md text-white font-bold tracking-wide"
                >
                  Create Game
                </Link>
              </div>
            </div>

            {/* My Games */}
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">
                  Make the change in your game collection?
                </h2>
                <p className="text-gray-400 mb-6">
                  Want to see the collection of enjoyment you have created for others.
                </p>
                <Link
                  to="/mygames"
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold transition-colors"
                >
                  MY Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <NavGame />
      <div className="bg-gray-900 min-h-screen text-white p-8 space-y-8">
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">No Game to play.</h2>
        </div>
        {/* This for game my game and create game button */}
        <div className="flex justify-center items-center">
          {/* Wrapper div to align child divs side by side */}
          <div className="flex justify-between gap-6">
            {/* Create Games */}
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

            {/* My Game functionality. */}
            <div className="flex justify-center items-center">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">
                  Make the change in your game Collection ?
                </h2>
                <p className="text-gray-400 mb-6">
                  want to see the collection of enjoyment you have created for others.
                </p>
                <Link
                  to="/mygames"
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold transition-colors"
                >
                  MY Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDashboard;
