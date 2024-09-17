const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const getAllUsers = async () => {
    const users = await User.find().populate('borrowedBooks.book', 'title');
    if (!users.length) throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
    return users;
}

module.exports = {
    getAllUsers
}