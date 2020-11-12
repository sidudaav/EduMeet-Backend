const User = require('../models/user.model');

const getUserByUsername = async (username) => {
    const foundUser = await User.findOne({ username: username });
    return foundUser;
};

module.exports.getUserByUsername = getUserByUsername;
