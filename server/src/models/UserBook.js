const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['favorite', 'reading', 'read'],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateRead: Date,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  notes: String
});

// Índice compuesto para evitar duplicados
userBookSchema.index({ user: 1, book: 1, status: 1 }, { unique: true });

const UserBook = mongoose.model('UserBook', userBookSchema);

module.exports = UserBook;
