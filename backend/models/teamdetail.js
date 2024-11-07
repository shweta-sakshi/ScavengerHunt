const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 }, // Optional, if team has a cumulative score
});

const Team = mongoose.model('Team', TeamSchema);
