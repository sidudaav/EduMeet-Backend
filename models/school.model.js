const mongoose = require('mongoose');

const schoolSchmea = mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    clubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club',
        },
    ],
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const School = mongoose.model('School', schoolSchmea);

module.exports = School;
