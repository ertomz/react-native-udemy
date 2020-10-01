const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// User object to manipulate data in Users Collection (create new instance, check email)
const User = mongoose.model('User');

// Create router
const router = express.Router();

// When someone signs up run function
router.post('/signup', async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = new User({ email, password });
        await user.save();
        // Generate JWT (json web token) with a secret key
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    }

});

// Whenever user signs in, run function
router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    // If no email or password, error
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    };
    // Find user with this email
    const user = await User.findOne({ email });
    // If no user, error
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
    // If user, compare password
    try {
        await user.comparePassword(password);
        // Generate JSON token
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        // Send token
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

// Make sure router used by application
module.exports = router;