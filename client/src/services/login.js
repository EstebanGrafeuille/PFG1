import asyncStorage from "./asyncStorage.js";

const BASE_URL = "http://192.168.0.9:5000";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
      console.log("En login");
      console.log(email, password);

    fetch(`${BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
        console.log("Guardando data", authData)
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, email, password}),
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

export default {
  login,
  logout,
  register,
};
