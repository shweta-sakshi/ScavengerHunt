const express = require('express');
const router = express.Router();
const solutiondb = require('../models/submissiondata'); // Your submission model
const Userdb = require('../models/userdata'); // Assuming this is your user model
const authenticate = require('../middleware/auth');

// Game-specific leaderboard
router.get('/leaderboard/:gameId', authenticate, async (req, res) => {
    const { gameId } = req.params;

    try {
        // Fetch submissions for the specific game, grouped by user
        const leaderboardData = await solutiondb.aggregate([
            { $match: { gameId: mongoose.Types.ObjectId(gameId) } }, // Match submissions for this game
            {
                $group: {
                    _id: "$userId", // Group by user
                    totalPoints: { $sum: "$points" }, // Sum points for all tasks in the game
                    lastCompletedAt: { $max: "$status" }, // Get the last completion time
                },
            },
            { $sort: { totalPoints: -1, lastCompletedAt: 1 } }, // Sort by highest points, then earliest time
        ]);

        // Populate user details (username)
        const leaderboard = await Userdb.populate(leaderboardData, {
            path: '_id',
            select: 'username',
        });

        const rankedLeaderboard = leaderboard.map((entry, index) => ({
            rank: index + 1, // Rank starts from 1
            username: entry._id.username,
            totalPoints: entry.totalPoints,
            lastCompletedAt: entry.lastCompletedAt
        }));

        console.log(rankedLeaderboard);

        res.status(200).json({ rankedLeaderboard });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game leaderboard', error: error.message });
    }
});

// Overall leaderboard
router.get('/leaderboard', authenticate, async (req, res) => {
    try {
        // Fetch all submissions across all games, grouped by user
        const leaderboardData = await solutiondb.aggregate([
            {
                $group: {
                    _id: "$userId", // Group by user
                    totalPoints: { $sum: "$points" }, // Sum all points from all games/tasks
                    lastCompletedAt: { $max: "$status" }, // Get the last task completion time
                },
            },
            { $sort: { totalPoints: -1, lastCompletedAt: 1 } }, // Sort by points desc, earliest completion time
        ]);

        // Populate user details (username)
        const leaderboard = await Userdb.populate(leaderboardData, {
            path: '_id',
            select: 'username',
        });

        const rankedLeaderboard = leaderboard.map((entry, index) => ({
            rank: index + 1,
            username: entry._id.username,
            totalPoints: entry.totalPoints,
            lastCompletedAt: entry.lastCompletedAt
        }));

        console.log(rankedLeaderboard);

        res.status(200).json({ rankedLeaderboard });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching overall leaderboard', error: error.message });
    }
});

module.exports = router;