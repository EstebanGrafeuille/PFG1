// server/src/services/reviewService.js
const Review = require("../models/Review");

class ReviewService {
  async create(userId, { googleId, comment }) {
    return await Review.create({ user: userId, googleId, comment });
  }

  async getById(id) {
    const rev = await Review.findById(id).populate("user", "username");
    if (!rev) throw new Error("Review no encontrada");
    return rev;
  }

  async listByBook(googleId) {
    return await Review.find({ googleId }).populate("user", "username");
  }

  async update(id, userId, data) {
    const rev = await Review.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
      runValidators: true
    });
    if (!rev) throw new Error("Review no encontrada o sin permiso");
    return rev;
  }

  async remove(id, userId) {
    const res = await Review.deleteOne({ _id: id, user: userId });
    if (res.deletedCount === 0) throw new Error("Review no encontrada o sin permiso");
  }
  
  async getByUserAndBook(userId, googleId) {
    const review = await Review.findOne({ user: userId, googleId }).populate("user", "username");
    if (!review) throw new Error("Reseña no encontrada");
    return review;
  }
}



module.exports = new ReviewService();
