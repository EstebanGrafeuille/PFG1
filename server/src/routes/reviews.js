// server/src/routes/reviews.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const reviewCtrl = require("../controllers/reviewController");

router.get("/book/:googleId", reviewCtrl.listByBook);
router.get("/:id", reviewCtrl.getById);

router.use(auth);

router.post("/", reviewCtrl.create);
router.put("/:id", reviewCtrl.update);
router.delete("/:id", reviewCtrl.remove);

module.exports = router;
