const router = require('express').Router();
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import Utils
const { getUserByUsername } = require('../utils/users.utils');

// Import Middlewares
const { verify } = require('../middlewares/auth.middlewares');

router.post('/register', async (req, res) => {
    const { username, firstName, lastName, grade, clubs } = req.body;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        grade,
        clubs,
        password: hashedPassword,
    });

    await newUser.save();
    res.json(newUser);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
        return res.json('KO');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.json('KO');
    }

    const payload = {
        id: user._id,
    };

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: ++process.env.ACCESS_TOKEN_LIFE,
        },
    );

    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: ++process.env.REFRESH_TOKEN_LIFE,
        },
    );

    user.refreshToken = refreshToken;
    user.save();

    res.json(accessToken);
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) {
        return res.json('KO');
    }

    let user;
    try {
        user = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );
    } catch (e) {
        console.log(e);
        return res.json('KO');
    }

    const payload = {
        username: user.username,
    };

    const newAccessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: ++process.env.ACCESS_TOKEN_LIFE,
        },
    );

    res.json(newAccessToken);
});

router.get('/secret', verify, (req, res) => {
    res.json('SECRET');
});

module.exports = router;
