import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavGame from "./NavGame";

const MyGames = () => {
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

    const [games, setGames] = useState();
    const [data, setdata] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("usersdatatoken");
        axios
            .get("/api/admin-game", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
            })
            .then((res) => {
                setGames(res.data);
                setdata(true)
            })
            .catch((error) => {
                setdata(false);
                console.error("Error fetching games:", error);
            });
    }, [data]);

    const [gameId, setGameId] = useState();
    const handleDeleteGame = () => {
        axios.delete(`/api/delete-games/${gameId}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("usersdatatoken")
            },
        }).then((res) => {
            console.log(res);
            setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
            alert(`Game Deleted`);
        }).catch((err) => {
            console.error("Error deleting game:", err);
        })

        setGameId("");
    };

    return (
        data ? (
            <>
                <NavGame />
                <div className="bg-gray-900 min-h-screen text-white p-10 space-y-10 flex flex-col items-center">
                    {/* Joined Games Section */}
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
                                            <Link to={`/gameDiscription/${game._id}`}>
                                                <img
                                                    src={game.profileImageUrl}
                                                    alt="game image"
                                                    className="h-48 w-full object-cover"
                                                />
                                            </Link>
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
                                                    onClick={handleDeleteGame}
                                                    className="bg-red-500 hover:bg-red-600 transition-colors duration-300 px-4 py-2 rounded-md text-white mt-4 font-semibold text-center"
                                                >
                                                    Delete
                                                </Link>
                                                <Link
                                                    to={`/updategameInfo/${game._id}`}
                                                    className="bg-green-500 hover:bg-green-600 transition-colors duration-300 px-4 py-2 rounded-md text-white mt-4 font-semibold text-center"
                                                >
                                                    Update
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <NavGame />
                <div className="bg-gray-900 min-h-screen text-white p-8 space-y-8">
                    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                        <Link
                            to='\gamePage'
                        >
                            <h2 className="text-xl font-bold mb-4 text-yellow-400">create game.</h2>
                        </Link>
                    </div>
                </div>
            </>
        )
    );
};

export default MyGames;
