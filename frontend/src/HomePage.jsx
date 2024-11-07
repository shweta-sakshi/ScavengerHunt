import React from "react";


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
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Campus Scavenger Hunt</h1>
        <p className="text-lg mb-6">Explore, Compete, and Win on Campus!</p>
        <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200">
          Start the Hunt!
        </button>
      </section>

      {/* Active Scavenger Hunts */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Active Scavenger Hunts
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeHunts.map((hunt) => (
            <div key={hunt.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{hunt.name}</h3>
              <p className="text-gray-600">{hunt.timeRemaining}</p>
              <p className="text-gray-600">Difficulty: {hunt.difficulty}</p>
              <p className="text-gray-600">Participants: {hunt.participants}</p>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-12 px-6 bg-purple-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Top Players</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {topPlayers.map((player, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold">{player.name}</h3>
              <p className="text-gray-600">Points: {player.points}</p>
              <p className="text-gray-500">Rank: {player.rank}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            View Full Leaderboard
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="text-center mb-6 md:mb-0">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <p className="text-gray-700">Join a Hunt</p>
          </div>
          <div className="text-center mb-6 md:mb-0">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <p className="text-gray-700">Find Clues Around Campus</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <p className="text-gray-700">Win Rewards!</p>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="py-12 px-6 bg-purple-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Updates</h2>
        <p className="text-center text-gray-700">
          Stay tuned for new scavenger hunts and updates!
        </p>
      </section>
    </div>
  );
};

export default Home;
