const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        body: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club',
        },
    },
    {
        timestamps: true,
    },
);

const Announcement = mongoose.model(
    'Announcement',
    announcementSchema,
);

module.exports = Announcement;
