const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

// Create router
const router = express.Router();

// Make sure user is signed in to request tracks
router.use(requireAuth);

// Route handler: get request, get user's tracks
router.get('/tracks', async (req, res) => {
    // Get userId
    const id = req.user._id;
    // Get tracks with relevant id
    const tracks = await Track.find({ userId: id })
    // Send array of tracks back to user
    res.send(tracks);
});

// Route handler: post request, add a track
router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    // Error checking
    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide a name and locations'});
    }
    try{
        // Create new instance of Track
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
       res.status(422).send({ error: err.message });
    }
    
});


module.exports = router;