// server/src/models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    googleId: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 2000
    }
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, googleId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
