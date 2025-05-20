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
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
