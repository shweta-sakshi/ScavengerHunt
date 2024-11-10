import React from "react";

// Sample data for contestants
const contestants = [
  { rank: 1, name: "Alice", score: 95, time: "12:30" },
  { rank: 2, name: "Bob", score: 90, time: "13:00" },
  { rank: 3, name: "Charlie", score: 85, time: "13:15" },
  { rank: 4, name: "David", score: 80, time: "13:45" },
  { rank: 5, name: "Eva", score: 78, time: "14:00" },
  { rank: 6, name: "Frank", score: 75, time: "14:30" },
  { rank: 7, name: "Grace", score: 70, time: "15:00" },
  { rank: 8, name: "Hannah", score: 68, time: "15:30" },
  { rank: 9, name: "Ivy", score: 65, time: "16:00" },
  { rank: 10, name: "Jack", score: 60, time: "16:30" },
  { rank: 11, name: "Liam", score: 58, time: "17:00" },
  { rank: 12, name: "Mia", score: 55, time: "17:30" },
  { rank: 13, name: "Noah", score: 50, time: "18:00" },
  { rank: 14, name: "Olivia", score: 45, time: "18:30" },
  { rank: 15, name: "Parker", score: 40, time: "19:00" },
  // Add more contestants as needed
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-800 p-6 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
        Leaderboard
      </h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3 text-yellow-400">Rank</th>
              <th className="p-3 text-yellow-400">Name</th>
              <th className="p-3 text-yellow-400">Score</th>
              <th className="p-3 text-yellow-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {contestants.map((contestant) => (
              <tr
                key={contestant.rank}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{contestant.rank}</td>
                <td className="p-3">{contestant.name}</td>
                <td className="p-3">{contestant.score}</td>
                <td className="p-3">{contestant.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
