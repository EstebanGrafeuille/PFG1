import asyncStorage from "./asyncStorage.js";
import BASE_URL from "../services/connection.js";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log("En login");
    console.log(email, password);

    fetch(`${BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          if (data.errors) {
            reject({ type: "validation", errors: data.errors }); // ✅ clave para que el frontend los muestre
          } else {
            reject({ type: "generic", message: data.message || "Login failed" });
          }
        } else {
          await asyncStorage.storeData("authData", data);
          resolve(data);
        }
      })
      .catch((error) => {
        reject({ type: "generic", message: error.message || "Unexpected error" });
      });
  });
};

const register = (username, email, password) => {
  console.log("En register1");
  console.log(email, password, username);

  return fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        throw { type: "validation", errors: data.errors };
      }

      throw { type: "generic", message: data.message || "Error al registrar usuario" };
    }

    await asyncStorage.storeData("authData", data);
    return data;
  });
};

const logout = async () => {
  await asyncStorage.clearAll();
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
