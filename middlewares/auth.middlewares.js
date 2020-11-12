const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const accessToken = req.body.jwt;

    if (!accessToken) {
        return res.json('KO');
    }

    let payload;
    try {
        payload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        );
        return next();
    } catch (e) {
        return res.json('KO');
    }
};

const refresh = (req, res, next) => {
    const accessToken = req.body.jwt;

    if (!accessToken) {
        return res.json('KO');
    }

    let payload;
    try {
        payload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        );
    } catch (e) {
        return res.json('KO');
    }

    const user = User.findOne({ username: payload.username });
    const refreshToken = user.refreshToken;

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
        return res.json('KO');
    }

    const newToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: ++process.env.ACCESS_TOKEN_LIFE,
        },
    );

    res.json(newToken);
};

module.exports.verify = verify;
module.exports.refresh = refresh;
