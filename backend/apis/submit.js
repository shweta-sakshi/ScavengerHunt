const express = require('express')
const router = new express.Router()
const Gamedb = require('../models/gamedetail');
const authenticate = require("../middleware/auth.js");
const solutiondb = require('../models/submissiondata')

//submitting answer.
router.post('/submit-answer', authenticate, async (req, res) => {
    const { gameId, taskId, solution } = req.body;

    try {
        // Find or initialize the user's game submission
        let submission = await solutiondb.findOne({
            userId: req.userId,
            gameId
        });

        if (!submission) {
            submission = new solutiondb({
                userId: req.userId,
                gameId,
                tasks: [], // Initialize tasks array for new submissions
                totalPoints: 0,
            });
        }

        // Find the specific task in the game
        const game = await Gamedb.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: "Game not found." });
        }

        const task = game.tasks.find(it => it._id.toString() === taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Handle submission for the specific task
        const existingTask = submission.tasks.find(it => it.taskId === taskId);
        let taskEntry;

        if (!existingTask) {
            taskEntry = {
                taskId,
                submit: [],
                taskpoint: 100, // Max points for new tasks
            };
            submission.tasks.push(taskEntry);
        } else {
            taskEntry = existingTask;
        }

        const { gameType } = game;

        // Check and process submission based on game type
        let isCorrect = false;
        if (gameType === "location") {
            const [taskLng, taskLat] = task.location.coordinates;
            const { lng, lat } = solution;

            const isWithinRadius = Math.abs(lat - taskLat) <= task.location.radius &&
                Math.abs(lng - taskLng) <= task.location.radius;

            isCorrect = isWithinRadius;

        } else if (gameType === "image") {
            // Placeholder for image verification logic
            isCorrect = true; // Assume image processing confirms correctness

        } else if (gameType === "question") {
            isCorrect = task.question.answer === solution.answer;
        }

        taskEntry.submit.push({
            answer: solution.answer || `(${solution.lat}, ${solution.lng})`,
            submittedAt: new Date(),
            isCorrect,
        });

        if (isCorrect) {
            if (!existingTask?.submit.some(s => s.isCorrect)) {
                submission.taskCompleted += 1;
                submission.totalPoints = (submission.totalPoints || 0) + taskEntry.taskpoint;
            }
        } else {
            if (taskEntry.taskpoint != 0)
                taskEntry.taskpoint -= 10;
        }

        // Check if all tasks are completed
        if (submission.taskCompleted === game.tasks.length && !submission.status) {
            submission.status = new Date(); // Set completion time
        }

        await submission.save();
        res.status(200).json({
            message: isCorrect ? "Task completed successfully." : "Incorrect answer, try again.",
            totalPoints: submission.totalPoints,
            tasksRemaining: game.tasks.length - submission.taskCompleted,
        });

    } catch (error) {
        res.status(500).json({ message: "Error processing submission", error: error.message });
    }
});

const getLeaderboard = async (gameId) => {
    const leaderboard = await solutionSubmission.aggregate([
        { $match: { gameId: mongoose.Types.ObjectId(gameId) } },
        {
            $group: {
                _id: "$userId",
                totalPoints: { $sum: "$totalPoints" },
                completionTime: { $min: "$completedAt" }
            }
        },
        { $sort: { totalPoints: -1, completionTime: 1 } } // Rank by points, then completion time
    ]);

    return leaderboard;
};

//Leaderboard.
router.get('/leaderboard/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const leaderboard = await getLeaderboard(gameId);
        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(500).json({ message: "Error generating leaderboard", error: error.message });
    }
});

module.exports = router;