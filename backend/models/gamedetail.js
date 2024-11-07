const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

//Schema:
const Gamedetail = new mongoose.Schema({
    GameTitle: {
        type: String,
        required: true,
        trim: true
    },
    Description: {
        type: String,
        // required: true
    },
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    TimeRanges: [{
        starttime: {
            type: Date,
            required: true,
        },
        endtime: {
            type: Date,
            required: true,
        }
    }],
    //use at the time of login.
    gameType: {
        type: String,
        enum: ['location', 'image', 'question'],
        required: true
    },
    tasks: [
        {
            task: {
                type: String,
                required: true
            },
            location: {
                coordinates: {
                    type: [Number], // [longitude, latitude]
                },
                radius: {
                    type: Number,
                }
            },
            image: {
                url: {
                    type: String,
                },
                altText: {
                    type: String
                }
            },
            question: {
                questionText: {
                    type: String,
                },
                answer: {
                    type: String
                }
            }
        }
    ]
});

// Custom validation for tasks based on gameType
Gamedetail.pre("save", function (next) {
    const { gameType, tasks } = this;
    const isLocationGame = gameType === "location";
    const isImageGame = gameType === "image";
    const isQuestionGame = gameType === "question";

    for (const task of tasks) {
        if (isLocationGame) {
            if (!task.location || !task.location.coordinates || !task.location.radius) {
                return next(new Error("Location tasks must include coordinates and radius."));
            }
        } else if (isImageGame) {
            if (!task.image || !task.image.url) {
                return next(new Error("Image tasks must include an image URL."));
            }
        } else if (isQuestionGame) {
            if (!task.question || !task.question.questionText || !task.question.answerOptions) {
                return next(new Error("Question tasks must include questionText and answerOptions."));
            }
        }
    }
    next();
});

//creating model in collection Called User using User and store it in usrdb variable
const Gamedb = new mongoose.model("Games", Gamedetail);

module.exports = Gamedb;