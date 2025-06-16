import BASE_URL from "../services/connection.js";
import errorHandler from "../utils/errorHandler.js";
import inputSanitizer from "../utils/inputSanitizer.js";
import secureStorage from "../utils/secureStorage.js";
import asyncStorage from "./asyncStorage.js";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log("En login");

    // Validar y sanitizar datos de entrada
    if (!inputSanitizer.validateEmail(email)) {
      return reject({
        type: "validation",
        errors: { email: "El formato del email no es válido" }
      });
    }

    const sanitizedEmail = inputSanitizer.sanitizeString(email);

    // No sanitizamos la contraseña para evitar problemas, pero validamos
    if (!password || password.trim().length < 6) {
      return reject({
        type: "validation",
        errors: { password: "La contraseña debe tener al menos 6 caracteres" }
      });
    }

    fetch(`${BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest" // Protección CSRF
      },
      credentials: "include", // Incluir cookies en la solicitud para CSRF
      body: JSON.stringify({ email: sanitizedEmail, password })
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          if (data.errors) {
            reject({ type: "validation", errors: data.errors });
          } else {
            reject({
              type: "generic",
              message: data.message || "Login failed",
              code: res.status === 401 ? "auth/invalid-credentials" : "generic"
            });
          }
        } else {
          // Agregar fecha de expiración (30 días)
          const authData = {
            ...data,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          };

          // Guardar en almacenamiento seguro
          await secureStorage.saveSecureItem("authData", authData);
          resolve(authData);
        }
      })
      .catch((error) => {
        const errorInfo = errorHandler.handleApiError(error);
        reject({
          type: "generic",
          message: errorInfo.userMessage,
          code: errorInfo.errorCode
        });
      });
  });
};

const register = (username, email, password) => {
  console.log("En register1");

  // Validar y sanitizar datos
  const validationErrors = {};

  if (!username || username.trim().length < 3) {
    validationErrors.username = "El nombre de usuario debe tener al menos 3 caracteres";
  }

  if (!inputSanitizer.validateEmail(email)) {
    validationErrors.email = "El formato del email no es válido";
  }

  const passwordValidation = inputSanitizer.validatePassword(password);
  if (!passwordValidation.valid) {
    validationErrors.password = passwordValidation.message;
  }

  if (Object.keys(validationErrors).length > 0) {
    return Promise.reject({ type: "validation", errors: validationErrors });
  }

  // Sanitizar datos de entrada
  const sanitizedUsername = inputSanitizer.sanitizeString(username);
  const sanitizedEmail = inputSanitizer.sanitizeString(email);

  return fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest" // Protección CSRF
    },
    credentials: "include", // Incluir cookies en la solicitud para CSRF
    body: JSON.stringify({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password
    })
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        throw { type: "validation", errors: data.errors };
      }

      throw {
        type: "generic",
        message: data.message || "Error al registrar usuario",
        code: res.status === 409 ? "auth/email-already-in-use" : "generic"
      };
    }

    // Añadir fecha de expiración
    const authData = {
      ...data,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Guardar en almacenamiento seguro
    await secureStorage.saveSecureItem("authData", authData);
    return authData;
  }).catch(error => {
    if (error.type === "validation") throw error;

    const errorInfo = errorHandler.handleAuthError(error);
    throw {
      type: "generic",
      message: errorInfo.userMessage,
      code: errorInfo.errorCode
    };
  });
};

const logout = async () => {
  try {
    // Eliminar datos de autenticación del almacenamiento seguro
    await secureStorage.removeSecureItem("authData");

    // También limpiar AsyncStorage por si acaso hay datos antiguos
    await asyncStorage.clearAll();

    // Opcional: si hay un endpoint de logout en el backend
    // fetch(`${BASE_URL}/auth/logout/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Requested-With": "XMLHttpRequest"
    //   },
    //   credentials: "include"
    // }).catch(e => console.error("Error al cerrar sesión en el servidor:", e));

    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};

const forgotPassword = (email) => {
  console.log("Enviando solicitud a backend con:", email); // 🔍

  return fetch(`${BASE_URL}/auth/forgotPassword/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
    .then(async (res) => {
      console.log("Respuesta del backend:", res.status); // 🔍

      const body = await res.json();

      if (res.ok) {
        console.log("Éxito:", body); // 🔍
        return body;
      }

      console.log("Error real desde backend:", body); // 🔍

      if (body.errors) {
        throw { type: "validation", errors: body.errors };
      }

      throw { type: "generic", message: body.message || "Unknown error" };
    })
    .catch((error) => {
      console.log("Catch del forgotPassword:", error); // 🔍

      if (error.type === "validation" || error.type === "generic") {
        throw error;
      }

      throw { type: "generic", message: error.message || "Unexpected error" };
    });
};

const resetPassword = (email, code, newPassword) => {
  return fetch(`${BASE_URL}/auth/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code, newPassword })
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        throw { type: "validation", errors: data.errors }; // 👈 ESTO ES CLAVE
      }

      throw { message: data.message || "Error resetting password" };
    }

    return data;
  });
};

export default {
  forgotPassword,
  resetPassword,
  login,
  register,
  logout
};
