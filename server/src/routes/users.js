const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUsername);
router.put("/:id", userController.updateUser);

module.exports = router;
