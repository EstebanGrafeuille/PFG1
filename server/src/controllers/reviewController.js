// server/src/controllers/reviewController.js
const reviewService = require("../services/reviewService");

class ReviewController {
  create = async (req, res) => {
    try {
      const rev = await reviewService.create(req.user.id, req.body);
      res.status(201).json({ success: true, data: rev });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
    }
  };

  getById = async (req, res) => {
    try {
      const rev = await reviewService.getById(req.params.id);
      res.json({ success: true, data: rev });
    } catch (e) {
      res.status(404).json({ success: false, message: e.message });
    }
  };

  listByBook = async (req, res) => {
    const revs = await reviewService.listByBook(req.params.googleId);
    res.json({ success: true, data: revs });
  };

  update = async (req, res) => {
    try {
      const rev = await reviewService.update(req.params.id, req.user.id, req.body);
      res.json({ success: true, data: rev });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
    }
  };

  remove = async (req, res) => {
    try {
      await reviewService.remove(req.params.id, req.user.id);
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
    }
  };

  getByUserAndBook = async (req, res) => {
    console.log("ACa tamo")
    try {
      const { userId, googleId } = req.params;
      const rev = await reviewService.getByUserAndBook(userId, googleId);
      res.json({ success: true, data: rev });
    } catch (e) {
      res.status(404).json({ success: false, message: e.message });
    }
  };

}

module.exports = new ReviewController();
