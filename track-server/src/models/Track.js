const mongoose = require('mongoose');

// Point Schema (a track is an array of points)
const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

// Track Schema
const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // UserId is pointing at an instance of User
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema] // A track is an array of points
});

// Load trackSchema into mongoose
// Only call trackSchema because pointSchema is inside it
mongoose.model('Track', trackSchema);