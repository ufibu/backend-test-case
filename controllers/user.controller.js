const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getAllUsers } = require('../services/user.service');

const getUsers = catchAsync(async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
})

module.exports = {
    getUsers
}