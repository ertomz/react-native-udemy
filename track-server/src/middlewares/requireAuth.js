const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// If successful JWT, call 'next' function
module.exports = (req, res, next) => {
    // Get request header
    // authorization ==== 'Bearer TOKEN'
    const { authorization } = req.headers;
    // If no header, not valid
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }
    // Get request token, get rid of 'Bearer'
    const token = authorization.replace('Bearer ', '');
    // Verify token
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        // If error, not valid
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        // Payload is info inside token (userID)
        const { userId } = payload;
        // Mongoose looks for user with given ID, assigns to 'user' variable so we know who made the request
        const user = await User.findById(userId);
        // Assign user from db to user who made request
        req.user = user;
        // Middleware done, now call next middleware
        next();
    });
};