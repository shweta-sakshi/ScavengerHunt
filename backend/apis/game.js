const express = require("express");
const router = new express.Router();
const Gamedb = require('../models/gameSchema');
const authenticate = require("../middleware/auth");
const upload = require('../utils/uploadmedia')

module.exports = (io) => {
    // Create a new game
    router.post('/create-game', authenticate, async (req, res) => {
        try {
            const { GameTitle, Description, TimeRanges, tasks } = req.body;

            // Ensure tasks align with gameType and type field in task
            validateTasksByGameType(tasks);

            const game = new Gamedb({
                GameTitle,
                Description,
                Admin: req.userId,
                TimeRanges,
                tasks //{type and any one of location, image or question based data.}
            });

            await game.save();
            console.log("Game created!!");

            // Emit event for real-time notifications
            io.emit('newGameCreated', { game }); // Socket.IO integration

            res.status(201).json({ message: "Game created successfully", game });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Failed to create game", error: error.message });
        }
    });

    // Get all games
    router.get('/all-games', authenticate, async (req, res) => {
        try {
            const games = await Gamedb.find({ Admin: { $ne: req.userId } }).populate('Admin', 'username email');
            res.status(200).json(games);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve games", error: error.message });
        }
    });

    //Game for user who has created it.
    router.get('/admin-game', authenticate, async (req, res) => {
        try {
            const games = await Gamedb.find({ Admin: req.userId }).populate('Admin', 'username email');
            res.status(200).json(games);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve games", error: error.message });
        }
    });

    // Get game by ID
    router.get('/game/:id', authenticate, async (req, res) => {
        try {
            const game = await Gamedb.findById(req.params.id).populate('Admin', 'username email');
            if (!game) return res.status(404).json({ message: "Game not found" });

            res.status(200).json(game);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve game", error: error.message });
        }
    });

    // Update game
    router.put('/update-game/:id', authenticate, async (req, res) => {
        try {
            const { tasks } = req.body;

            // Validate tasks before updating
            validateTasksByGameType(tasks);

            const updatedGame = await Gamedb.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!updatedGame) return res.status(404).json({ message: "Game not found" });

            res.status(200).json({ message: "Game updated successfully", updatedGame });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Failed to update game", error: error.message });
        }
    });

    // Delete game
    router.delete('/delete-games/:id', authenticate, async (req, res) => {
        try {
            const deletedGame = await Gamedb.findByIdAndDelete(req.params.id);
            if (!deletedGame) return res.status(404).json({ message: "Game not found" });

            res.status(200).json({ message: "Game deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete game", error: error.message });
        }
    });

    return router;
};

// Utility function to validate tasks based on their type
function validateTasksByGameType(tasks) {
    tasks.forEach(task => {
        if (task.type === 'location') {
            if (!task.location || !task.location.coordinates || !task.location.radius) {
                throw new Error("Location tasks must include coordinates and radius.");
            }
        } else if (task.type === 'image') {
            if (!task.image || !task.image.url) {
                throw new Error("Image tasks must include a valid image URL.");
            }
        } else if (task.type === 'question') {
            if (!task.question || !task.question.questionText || !task.question.answer) {
                throw new Error("Question tasks must include questionText and answer.");
            }
        } else {
            throw new Error("Invalid task type specified.");
        }
    });
}
