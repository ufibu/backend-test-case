const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getAllBooks, returnBook, borrowBook } = require('../services/book.service');

const getBooks = catchAsync(async (req, res) => {
    const books = await getAllBooks();
    res.send(books);
})

const borrow = catchAsync(async (req, res) => {
    const { bookCode, userCode } = req.body;
    const result = await borrowBook(bookCode, userCode);
    res.send(result);
})

const returns = catchAsync(async (req, res) => {
    const { bookCode, userCode } = req.body;
    const result = await returnBook(bookCode, userCode);
    res.send(result);
});

module.exports = {
    getBooks,
    borrow,
    returns
}