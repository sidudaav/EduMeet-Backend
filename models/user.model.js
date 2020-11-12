const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    grade: {
        type: Number,
    },
    clubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club',
        },
    ],

    refreshToken: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
