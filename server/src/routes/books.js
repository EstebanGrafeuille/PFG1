const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas para libros
router.post('/', bookController.saveBook);
router.get('/favorites', bookController.getFavorites);
router.post('/favorites', bookController.addToFavorites);
router.delete('/favorites/:bookId', bookController.removeFromFavorites);

module.exports = router;
