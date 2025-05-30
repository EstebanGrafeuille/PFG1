const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const upload = require("../middleware/upload");

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUsername);
router.put("/:id", userController.updateUser);
router.put("/:id/image", upload.single("image"), userController.updateImage);

module.exports = router;
