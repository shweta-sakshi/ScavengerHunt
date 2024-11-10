const mongoose = require('mongoose');
const gameDb = require('./gameSchema')

//Schema for submission.
const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gamedetail', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, required: true },

    submissions: [{
        answer: { type: String, required: true },  // User's submitted answer
        isCorrect: { type: Boolean, default: false },
        submittedAt: { type: Date, default: Date.now }
    }],

    isCompleted: { type: Boolean, default: false },  // Marks if task is completed
    points: { type: Number, default: 0 },  // Total points for this user in the game
    status: { type: Date }
});

// submit answer.
SubmissionSchema.methods.submitAnswer = async function (answer) {

    const game = await gameDb.findById(this.gameId); //fetch game from id 
    if (!game) throw new Error('Game not found');
    if (this.userId === game.Admin) {
        throw new Error('Admin can not play the game');
    }

    const task = game.tasks.id(this.taskId);  // Access the task by its ID within the tasks array
    if (!task) throw new Error('Task not found');

    // Check if the task is completed (correct answer already submitted)
    if (this.isCompleted) {
        throw new Error('This task has already been completed. No further submissions allowed.');
    }

    let isCorrect = false;
    let points = 0;

    // Validate the answer based on the task type
    if (task.type === 'question') {

        // Compare the user's answer with the task's correct answer
        isCorrect = (answer === task.question.answer);
        points = isCorrect ? 100 : 0;  // Example of awarding points (you can modify this logic)
    }

    else if (task.type === 'location') {
        const { lat, lng } = answer;
        const { targetLocation } = task.location.coordinates
        const tolerance = task.location.radius
        if (Math.abs(lat - targetLocation.lat) <= tolerance && Math.abs(lng - targetLocation.lng) <= tolerance) {
            isCorrect = true;
            points = 100;
        }
    }

    else if (task.type === 'image') {

        // logic for handellling image in image processing.

    }

    // Add the submission
    this.submissions.push({
        answer,
        isCorrect,
        submittedAt: new Date()
    });

    // If the answer is correct, mark the task as completed
    if (isCorrect) {
        this.isCompleted = true;
        this.status = new Date();  // Record the completion timestamp
    }

    // Update the total points for the game
    this.point = points;

    // Save the submission document
    await this.save();

    return this;
};

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
