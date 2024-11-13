const express = require('express')
const router = new express.Router()
const Gamedb = require('../models/gameSchema.js');
const authenticate = require("../middleware/auth.js");
const solutiondb = require('../models/submissiondata')

//submitting answer.
router.post('/submit-answer', authenticate, async (req, res) => {
    const { gameId, taskId, solution } = req.body;
    console.log(req.body);
    try {
        let submission = await solutiondb.findOne({ gameId: gameId, userId: req.userId, taskId: taskId });

        if (!submission) {
            // Create a new submission if it doesn't exist yet
            submission = new solutiondb({
                gameId,
                userId: req.userId,
                taskId
            });
        }

        try {
            await submission.submitAnswer(solution);  // userAnswer is the answer submitted by the user
            console.log('Answer submitted successfully');
        } catch (error) {
            console.error('Error submitting answer:', error.message);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error processing submission", error: error.message });
    }
});

// router.get('/submitted-answer', authenticate, async(req, res)=>{
//     try {
//         const submission = await solutiondb.findOne({ gameId: gameId, userId: req.userId, taskId: taskId });
//     } catch (error) {

//     }
// })

module.exports = router;