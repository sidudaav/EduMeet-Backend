const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
        type: String,
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    description: {
        type: String,
    },
    websiteLink: {
        type: String,
    },
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
