const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Importar configuración de la base de datos
const connectDB = require("./src/config/db");

// Importar rutas
const routes = require("./src/routes/routes");

// Configuración
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);
// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api", routes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor", error: err.message });
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`🌐 Accesible desde la red en http://192.168.100.6:${PORT}`);
});

module.exports = app;
