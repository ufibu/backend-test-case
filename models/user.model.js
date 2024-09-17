const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const borrowedSchema = new mongoose.Schema({
    book: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Book', required: true
    },
    borrowedAt: {
        type: Date,
        default: Date.now
    },
})

const userSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    borrowedBooks: [borrowedSchema],
    isPenalized: { type: Boolean, default: false },
});

userSchema.plugin(toJSON);
borrowedSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);

module.exports = User;