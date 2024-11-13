const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: "image for reference"
    }
});