const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(auth);

// Ruta de prueba
router.get('/profile', (req, res) => {
  res.json({ message: 'Perfil de usuario' });
});

module.exports = router;
