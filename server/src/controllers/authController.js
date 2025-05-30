const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario o email ya está registrado" });
    }

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    // Validación específica de Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// Obtener usuario actual
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
    user.resetCode = code;
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    await sendEmail(
      email,
      "Recuperación de contraseña - BookBox",
      `¡Hola!

      Recibimos una solicitud para restablecer tu contraseña en BookBox.

      Tu código de verificación es: ${code}

      Este código es válido por los próximos 10 minutos.

      Si no solicitaste este cambio, podés ignorar este mensaje.

      Saludos,
      El equipo de BookBox 📚`
    );

    res.json({ message: "Código enviado al correo" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar código", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetCode !== code || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Código inválido o expirado" });
    }

    user.password = newPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;

    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al restablecer la contraseña", error: error.message });
  }
};
