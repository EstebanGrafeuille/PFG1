import asyncStorage from "./asyncStorage.js";

const BASE_URL = "http://localhost:5000";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log("En login");
    console.log(email, password);

    fetch(`${BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Usuario o contraseña incorrectos");
        }
      })
      .then((authData) => {
        asyncStorage.storeData("authData", authData);
        console.log("Guardando data", authData);
        resolve(authData);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

const register = (username, email, password) => {
  console.log("En register1");
  console.log(email, password, username);

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error al registrar usuario");
        }
      })
      .then((authData) => {
        asyncStorage.storeData("authData", authData);
        resolve(authData);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

const logout = async () => {
  await asyncStorage.clearAll();
};

const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    console.log("Enviando solicitud a backend con:", email); // 🔍

    fetch(`${BASE_URL}/api/auth/forgotPassword/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then((res) => {
        console.log("Respuesta del backend:", res.status); // 🔍

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((errorBody) => {
            console.log("Error real desde backend:", errorBody);
            throw new Error(errorBody.message || "Error desconocido");
          });
        }
      })
      .then((data) => {
        console.log("Éxito:", data); // 🔍

        resolve(data);
      })
      .catch((error) => {
        console.log("Catch del forgotPassword:", error); // 🔍

        reject(error.message);
      });
  });
};

const resetPassword = (email, code, newPassword) => {
  return fetch(`${BASE_URL}/api/auth/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code, newPassword })
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        throw new Error(err.message || "Error al restablecer contraseña");
      });
    }
    return res.json();
  });
};

export default {
  forgotPassword,
  resetPassword,
  login,
  register,
  logout
};
