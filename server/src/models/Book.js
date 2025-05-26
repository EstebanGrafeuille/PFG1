const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [String],
  description: String,
  thumbnail: String,
  pageCount: Number,
  categories: [String],
  publishedDate: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

bookSchema.methods.save = async function save(bookSchema) {
  
}

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
