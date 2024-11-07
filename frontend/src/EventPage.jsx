import { Link } from "react-router-dom";

const EventPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/path/to/your/bg-image.jpg')` }}>
      <div className="bg-gray-900 bg-opacity-80 min-h-screen flex flex-col items-center px-4 md:px-16 text-white">
        
        {/* Header Section */}
        <header className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Campus Scavenger Hunt</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Explore hidden spots, solve riddles, and compete against friends in this thrilling campus-wide scavenger hunt!
          </p>
        </header>

        {/* Instructions Section */}
        <section className="bg-gray-800 bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg mb-10 max-w-4xl w-full text-center">
          <h2 className="text-3xl font-bold mb-4">How to Play</h2>
          <ul className="text-left list-disc list-inside space-y-3 text-lg">
            <li>Follow the clues to find the next location.</li>
            <li>Each location unlocks a new riddle or task.</li>
            <li>Complete tasks as quickly as possible to earn points.</li>
            <li>The top players will be featured on the leaderboard.</li>
            <li>Use hints if you are stuck, but they may cost points.</li>
          </ul>
        </section>

        {/* Leaderboard Section */}
        <section className="bg-indigo-600 bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg mb-10 max-w-4xl w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Player</th>
                <th className="py-2 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample leaderboard data */}
              <tr className="bg-gray-700 bg-opacity-70">
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">1200</td>
              </tr>
              <tr>
                <td className="py-2 px-4">2</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">1150</td>
              </tr>
              <tr className="bg-gray-700 bg-opacity-70">
                <td className="py-2 px-4">3</td>
                <td className="py-2 px-4">Alice Brown</td>
                <td className="py-2 px-4">1100</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Start Game Button */}
        <Link to="/start-game" className="mb-16">
          <button className="px-8 py-4 text-2xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md shadow-lg">
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventPage;