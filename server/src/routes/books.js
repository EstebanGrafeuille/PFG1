const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas para libros
router.get("/getLista", bookController.getLista);
router.get("/getAllLibros", bookController.getAllLibros);
router.post("/addLista", bookController.addLista);
router.post("/addLibroToLista", bookController.addToLista);
router.delete("/removeFromLista", bookController.removeFromLista);
router.get("/getListas", bookController.getListas);

module.exports = router;
