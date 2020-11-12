const router = require('express').Router();
const School = require('../models/school.model');

// Get school based off of school code
router.post('/find/:code', async (req, res) => {
    const foundSchool = await School.findOne({
        code: req.params.code,
    });
    res.json(foundSchool);
});

// GENERAL API ROUTES

// Get all schools
router.get('/', async (req, res) => {
    const schools = await School.find();
    res.json(schools);
});

// Create a school
router.post('/', async (req, res) => {
    const newSchool = await School.create(req.body);

    await newSchool.save();
    res.json(newSchool);
});

// Delete all schools
router.delete('/', async (req, res) => {
    await School.deleteMany();
    res.json('OK');
});

// Get a school with a specific ID
router.get('/:id', async (req, res) => {
    const school = await School.findById(req.params.id);
    res.json(school);
});

// Delete a school with a specific ID
router.delete('/:id', async (req, res) => {
    const deletedSchool = await School.findByIdAndDelete(
        req.params.id,
    );

    res.json(deletedSchool);
});

// Update a school with a specific ID
router.patch('/:id', async (req, res) => {
    let school = await School.findById(req.params.id);

    for ([key, value] of Object.entries(req.body)) {
        school[key] = value;
    }

    const updatedSchool = await school.save();
    res.json(updatedSchool);
});

module.exports = router;
