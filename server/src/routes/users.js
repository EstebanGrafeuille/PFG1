const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas
router.get('/:username', userController.getByUsername);

module.exports = router;
