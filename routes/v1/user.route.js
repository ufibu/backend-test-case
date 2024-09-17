const express = require('express');
const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const router = express.Router();

router.get('/', userController.getUsers);

module.exports = router;

