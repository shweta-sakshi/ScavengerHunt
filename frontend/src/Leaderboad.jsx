import React from "react";

// Sample data for contestants
const contestants = [
  { rank: 1, name: "Alice", score: 95, time: "12:30" },
  { rank: 2, name: "Bob", score: 90, time: "13:00" },
  { rank: 3, name: "Charlie", score: 85, time: "13:15" },
  { rank: 4, name: "David", score: 80, time: "13:45" },
];

const Leaderboard = () => {
  // Filter only top 3 contestants based on rank
  const topThree = contestants.slice(0, 3);

  return (
    <div className="leaderboard bg-gray-800 p-6 max-w-md mx-auto rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">
        Top 3 Contestants
      </h1>
      <table className="w-full table text-white">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3">Score</th>
            <th className="p-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {topThree.map((contestant) => (
            <tr key={contestant.rank} className="border-b border-gray-700">
              <td className="p-3">{contestant.rank}</td>
              <td className="p-3">{contestant.name}</td>
              <td className="p-3">{contestant.score}</td>
              <td className="p-3">{contestant.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
