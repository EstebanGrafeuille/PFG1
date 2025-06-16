const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.header("Authorization");

    // Verificar si hay header de autorización
    if (!authHeader) {
      return res.status(401).json({ message: "No hay token de autorización, acceso denegado" });
    }

    // Mantener la verificación de formato pero sin ser tan estricto
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : authHeader;

    // Verificar si no hay token
    if (!token) {
      return res.status(401).json({ message: "No hay token, autorización denegada" });
    }

    // Verificar token con manejo de errores simplificado
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      // Un mensaje genérico para cualquier error de token
      return res.status(401).json({
        message: "Token no válido o expirado, inicie sesión nuevamente"
      });
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(500).json({ message: "Error del servidor en autenticación" });
  }
};
