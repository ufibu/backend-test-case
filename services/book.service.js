const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Book = require('../models/Book.model');
const User = require('../models/user.model');

const borrowBook = async (bookCode, userCode) => {
    const book = await Book.findOne({ code: bookCode });
    if (!book) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    if (book.stock === 0) throw new ApiError(httpStatus.BAD_REQUEST, 'Book out of stock');

    const user = await User.findOne({ code: userCode });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    if (user.isPenalized) throw new ApiError(httpStatus.BAD_REQUEST, 'User is penalized');
    if (user.borrowedBooks.length >= 2) throw new ApiError(httpStatus.BAD_REQUEST, 'User has reached the limit of borrowed books');

    book.stock -= 1;
    book.borrowedBy.push(user._id);
    user.borrowedBooks.push({ book: book._id, borrowedAt: Date.now() });

    await book.save();
    await user.save();

    return { message: 'Book borrowed successfully', data: { book: book.title, user: user.name } };
}

const returnBook = async (bookCode, userCode) => {
    const book = await Book.findOne({ code: bookCode });
    if (!book) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');

    const user = await User.findOne({ code: userCode });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    const borrowedBook = user.borrowedBooks.find((borrowed) => borrowed.book.toString() === book._id.toString());
    if (!borrowedBook) throw new ApiError(httpStatus.BAD_REQUEST, 'Book not borrowed by user');

    const dueDate = new Date(borrowedBook.borrowedAt);
    const daysBorrowed = (new Date() - dueDate) / (1000 * 60 * 60 * 24); 

    if (daysBorrowed > 7) {
        user.isPenalized = true; 
    }

    book.stock += 1;
    book.borrowedBy = book.borrowedBy.filter((borrower) => borrower.toString() !== user._id.toString());
    
    user.borrowedBooks = user.borrowedBooks.filter((borrowed) => borrowed.book.toString() !== book._id.toString());

    await book.save();
    await user.save();

    if (user.isPenalized) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User penalized for returning book after 7 days');
    }

    return { message: 'Book returned successfully', data: { book: book.title, user: user.name } };
};


const getAllBooks = async () => {
    const books = await Book.find().populate('borrowedBy', 'id name');
    if (!books.length) throw new ApiError(httpStatus.NOT_FOUND, 'Books not found');
    return books;
}

module.exports = {
    borrowBook,
    returnBook,
    getAllBooks
}
