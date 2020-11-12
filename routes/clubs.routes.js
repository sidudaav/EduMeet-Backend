const router = require('express').Router();
const Club = require('../models/club.model');

// GENERAL API ROUTES

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
