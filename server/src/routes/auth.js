const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

// Configurar limitadores para rutas sensibles
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por ventana por IP
  standardHeaders: true,
  message: "Demasiados intentos de inicio de sesión, por favor intente más tarde"
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 intentos por hora por IP
  standardHeaders: true,
  message: "Demasiados intentos de recuperación de contraseña, por favor intente más tarde"
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 registros por hora por IP
  standardHeaders: true,
  message: "Demasiados intentos de registro, por favor intente más tarde"
});

// Rutas públicas con limitación de intentos
router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/forgotPassword", forgotPasswordLimiter, authController.forgotPassword);
router.post("/resetPassword", forgotPasswordLimiter, authController.resetPassword);

// Rutas protegidas
router.get("/me", auth, authController.getMe);

module.exports = router;
