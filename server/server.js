const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Importar configuración de la base de datos
const connectDB = require("./src/config/db");

// Importar rutas
const routes = require("./src/routes/routes");

// Configuración
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS más permisiva para desarrollo y aplicaciones móviles
const corsOptions = {
  origin: '*', // Permitir cualquier origen en desarrollo
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(morgan("dev")); // Mantén el logger de desarrollo para ver las solicitudes

// Helmet con configuración ajustada para permitir comunicación con la app móvil
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
  })
);

// Limitar solicitudes con configuración menos estricta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500, // Valor elevado para no afectar el desarrollo
  standardHeaders: true,
  message: "Demasiadas solicitudes desde esta IP, por favor intente más tarde"
});

// Aplicar limitador a rutas sensibles, no a todas
app.use("/api/auth/login", limiter);
app.use("/api/auth/register", limiter);
app.use("/api/auth/forgotPassword", limiter);

// Conectar a la base de datos
connectDB();

// IMPORTANTE: solo registrar las rutas una vez
// Las rutas ya están configuradas con prefijos /api/ en routes.js
app.use(routes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor", error: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
