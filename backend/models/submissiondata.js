const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Games', required: true },
    tasks: [{
        taskId: { type: String, required: true }, // Identifier for the task/question
        submit: [{
            answer: { type: String, required: true }, // User's submitted answer
            submittedAt: { type: Date, default: Date.now }, // Submission timestamp
            isCorrect: { type: Boolean, default: false }, // Indicates if the answer was correct
        }],
        taskpoint: { type: Number, Default: 100 }
    }],
    taskCompleted: { type: Number, default: 0 },
    totalPoints: { type: Number },
    status: { type: Date } //record time of completion.
});

const solutionSubmission = mongoose.model('solutionSubmissions', SubmissionSchema);

module.exports = solutionSubmission;
