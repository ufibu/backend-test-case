const express = require('express');
const bookController = require('../../controllers/book.controller');
const bookValidation = require('../../validations/book.validation');
const validate = require('../../middlewares/validate');
const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/borrow', validate(bookValidation.borrow), bookController.borrow);
router.post('/return', validate(bookValidation.returns), bookController.returns);

module.exports = router;