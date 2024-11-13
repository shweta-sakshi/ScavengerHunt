const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    },
    radius: {
        type: Number,
        required: true
    }
});