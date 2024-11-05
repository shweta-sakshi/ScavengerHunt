const express = require("express");
const router = new express.Router();
const Gamedb = require('../models/gamedetail');
const Userdb = require('../models/userdata')
const authenticate = require("../middleware/auth");

//create new game.
router.post('/create-game', authenticate, async (req, res) => {
    try {
        console.log(req.userId);
        console.log(req.body);

        const { GameTitle, Description, TimeRanges, gameType, tasks } = req.body.gameData;
        const Admin = req.userId;
        console.log(tasks);
        console.log(tasks[0].question)

        // Create a new game with the provided data
        const game = new Gamedb({
            GameTitle,
            Description,
            Admin,
            TimeRanges,
            gameType, //question
            tasks
        });

        await game.save();
        console.log("game created!!");
        // Notify all users (broadcast)
        // io.emit('newGameCreated', { game: req.body });
        res.status(201).json({ message: "Game created successfully", game });
    } catch (error) {
        res.status(400).json({ message: "Failed to create game", error: error.message });
    }
})

//Get all game.
router.get("/all-games", authenticate, async (req, res) => {
    try {
        const games = await Gamedb.find().populate("Admin", "userdb"); // Assuming the `Users` model has a `username` field
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve games", error: error.message });
    }
});

//get game by id.
router.get("/game/:id", authenticate, async (req, res) => {
    try {
        const game = await Gamedb.findById(req.params.id).populate("Admin", "userdb");
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve game", error: error.message });
    }
});

//update game.
router.put("/update-game/:id", authenticate, async (req, res) => {
    try {
        const updatedGame = await Gamedb.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json({ message: "Game updated successfully", updatedGame });
    } catch (error) {
        res.status(400).json({ message: "Failed to update game", error: error.message });
    }
});

//Delete game.
router.delete("/delete-games/:id", authenticate, async (req, res) => {
    try {
        const deletedGame = await Gamedb.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete game", error: error.message });
    }
});

module.exports = router;