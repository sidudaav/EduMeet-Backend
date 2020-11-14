const router = require('express').Router();
const Club = require('../models/club.model');
const Announcement = require('../models/announcement.model');

// GENERAL API ROUTES

router.get('/:id/students', async (req, res) => {
    const club = await Club.findById(req.params.id);
    const populatedClub = await club.execPopulate('students');
    res.json(populatedClub.students);
});

router.post('/:id/announcements', async (req, res) => {
    const newAnnouncement = await Announcement.create({
        ...req.body,
        club: req.params.id,
    });

    await newAnnouncement.save();
    res.json(newAnnouncement);
});

router.get('/:id/announcements', async (req, res) => {
    const announcements = await Announcement.find({
        club: req.params.id,
    });
    const populatedAnnouncements = [];

    for (let i = 0; i < announcements.length; i++) {
        const populatedAnnouncement = await announcements[
            i
        ].execPopulate('user');
        populatedAnnouncements.push(populatedAnnouncement);
    }

    res.json(populatedAnnouncements);
});

// Get all clubs
router.get('/', async (req, res) => {
    const clubs = await Club.find();
    res.json(clubs);
});

// Create a club
router.post('/', async (req, res) => {
    const newClub = await Club.create(req.body);

    await newClub.save();
    res.json(newClub);
});

// Delete all clubs
router.delete('/', async (req, res) => {
    await Club.deleteMany();
    res.json('OK');
});

// Get a club with a specific ID
router.get('/:id', async (req, res) => {
    const club = await Club.findById(req.params.id);
    res.json(club);
});

// Delete a club with a specific ID
router.delete('/:id', async (req, res) => {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);

    res.json(deletedClub);
});

// Update a club with a specific ID
router.patch('/:id', async (req, res) => {
    let club = await Club.findById(req.params.id);

    for ([key, value] of Object.entries(req.body)) {
        club[key] = value;
    }

    const updatedClub = await club.save();
    res.json(updatedClub);
});

module.exports = router;
