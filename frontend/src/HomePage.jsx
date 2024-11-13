import React from "react";``
import { Link } from "react-router-dom";
import NavGame from "./NavGame";

const activeHunts = [
  {
    id: 1,
    name: "Campus Adventure",
    timeRemaining: "2 days left",
    difficulty: "Medium",
    participants: 50,
  },
  {
    id: 2,
    name: "Library Mystery",
    timeRemaining: "1 day left",
    difficulty: "Hard",
    participants: 30,
  },
];

const topPlayers = [
  { name: "Alice Smith", points: 120, rank: 1 },
  { name: "Bob Johnson", points: 100, rank: 2 },
  { name: "Charlie Lee", points: 90, rank: 3 },
];

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <NavGame />
      {/* Hero Section */}
      <section className="bg-yellow-500 text-gray-900 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Campus Scavenger Hunt</h1>
        <p className="text-lg mb-6">Explore, Compete, and Win on Campus!</p>
        <Link 
          to="/eventPage"
        className="bg-gray-900 text-yellow-500 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-800 transition-all">
          Start the Hunt!
        </Link>
      </section>

      {/* Active Scavenger Hunts */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">
          Active Scavenger Hunts
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeHunts.map((hunt) => (
            <div key={hunt.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                {hunt.name}
              </h3>
              <p className="text-gray-400">{hunt.timeRemaining}</p>
              <p className="text-gray-400">Difficulty: {hunt.difficulty}</p>
              <p className="text-gray-400">Participants: {hunt.participants}</p>
              <button className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">
          Top Players
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {topPlayers.map((player, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold text-yellow-500">
                {player.name}
              </h3>
              <p className="text-gray-400">Points: {player.points}</p>
              <p className="text-gray-300">Rank: {player.rank}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">         
          <Link
            to="/leaderboad"
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400"
          >
            View Full Leaderboard
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="text-center mb-6 md:mb-0">
            <div className="bg-yellow-500 text-gray-900 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <p className="text-gray-300">Join a Hunt</p>
          </div>
          <div className="text-center mb-6 md:mb-0">
            <div className="bg-yellow-500 text-gray-900 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <p className="text-gray-300">Find Clues Around Campus</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500 text-gray-900 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <p className="text-gray-300">Win Rewards!</p>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">
          Latest Updates
        </h2>
        <p className="text-center text-gray-400">
          Stay tuned for new scavenger hunts and updates!
        </p>
      </section>
    </div>
  );
};

export default Home;
