const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});