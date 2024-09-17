const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    borrowedBy: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: 'User'
        }
    ]
});

bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;