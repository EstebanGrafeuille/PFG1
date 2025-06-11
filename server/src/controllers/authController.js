const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bookService = require("../services/bookService");
const { isValidEmail } = require("../utils/helpers");

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username })
    ]);

    if (existingEmail || existingUsername) {
      return res.status(400).json({
        errors: {
          ...(existingEmail && { email: "This email is already in use" }),
          ...(existingUsername && { username: "This username is already taken" })
        }
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    console.log("User created");
    await bookService.createUB(user._id);
    console.log("UB created");

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    // Field validation (e.g., minlength, required, etc.)
    if (error.name === "ValidationError") {
      const fieldErrors = {};
      for (const key in error.errors) {
        fieldErrors[key] = error.errors[key].message;
      }
      return res.status(400).json({ errors: fieldErrors });
    }

    res.status(500).json({
      message: "An error occurred while registering the user",
      error: error.message
    });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        errors: {
          general: "Invalid email or password"
        }
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: error.message
    });
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

    // Manual validation for required field
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({
        errors: {
          email: "Email is required"
        }
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        errors: { email: "Invalid email format" }
      });
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({
        errors: {
          email: "No account found with this email"
        }
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = code;
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    await sendEmail(
      email,
      "Password Recovery - BookBox",
      `Hi there!

We received a request to reset your BookBox password.

Your verification code is: ${code}

This code will expire in 10 minutes.

If you didn’t request a password reset, feel free to ignore this message.

Best,  
The BookBox Team 📚`
    );

    res.json({ message: "Verification code sent to your email" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while sending the code",
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetCode !== code || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({
        errors: {
          code: "Invalid or expired code"
        }
      });
    }

    user.password = newPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;

    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const fieldErrors = {};
      for (const key in error.errors) {
        fieldErrors[key] = error.errors[key].message;
      }
      return res.status(400).json({ errors: fieldErrors });
    }

    res.status(500).json({
      message: "An error occurred while resetting the password",
      error: error.message
    });
  }
};
