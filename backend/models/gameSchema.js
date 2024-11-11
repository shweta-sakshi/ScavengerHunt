const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationSchema = require('./locationSchema')
const ImageSchema = require('./imageSchema')
const QuestionSchema = require('./questionSchema')

// game schema
const Gamedetail = new Schema({
    GameTitle: {
        type: String,
        required: true,
        trim: true
    },
    profileImageUrl: {
        type: String,
        require: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33wdylFfzr7kybpz6LMTJugCOhNBwKqjsBw&s"
    },
    Description: {
        type: String
    },
    Admin: { type: Schema.Types.ObjectId, ref: 'Users' },
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
    tasks: [{
        type: {
            type: String,
            enum: ['location', 'image', 'question'],
            required: true
        },
        taskname: {
            type: String,
            required: true
        },
        taskdescription: {
            type: String,
            required: true
        },
        location: LocationSchema,
        image: ImageSchema,
        question: QuestionSchema
    }]
});

// Custom validation middleware for tasks
Gamedetail.pre("save", function (next) {
    const { gameType, tasks } = this;

    for (const task of tasks) {
        if (gameType === "location") {
            if (!task.location || !task.location.coordinates || !task.location.radius) {
                return next(new Error("Location tasks must include coordinates and radius."));
            }
        } else if (gameType === "image") {
            if (!task.image || !task.image.url) {
                return next(new Error("Image tasks must include an image URL."));
            }
        } else if (gameType === "question") {
            if (!task.question || !task.question.questionText || !task.question.answer) {
                return next(new Error("Question tasks must include questionText and answer."));
            }
        }
    }
    next();
});

module.exports = mongoose.model('Gamedetail', Gamedetail);
