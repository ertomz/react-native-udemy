const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema: tells mongoose about user properties
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // No duplicate emails
        requires: true // Must provide an email
    },
    password: {
        type: String,
        required: true // Must provide password
        // Duplicate passwords allowed
    }
});

// Salting and hashing
userSchema.pre('save', function(next) {
    const user = this;
    // If user hasn't modified password, don't salt anything
    if (!user.isModified('password')) {
        return next();
    }
    // Salt and hash: the # is complexity level of salt
    bcrypt.genSalt(10, (err, salt) => {
        // If error salting, stop
        if (err) {
            return next(err);
        }
        // Generate hash
        bcrypt.hash(user.password, salt, (err, hash) => {
            // If error hashing, stop
            if (err) {
                return next(err);
            }
            // Overwrite password with hash+salt password
            user.password = hash;
            // Save user and continue
            next();
        });
    });
});

// Compare saved password with attempted login password
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    // Promise: can be rejected or resolved
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            // If error, reject promise with error
            if (err) {
                return reject(err);
            }
            // If not match, reject promise with false
            if (!isMatch) {
                return reject(false);
            }
            // Otherwise, must be a match, resolve promise
            resolve(true);
        });
    });
};

mongoose.model('User', userSchema);