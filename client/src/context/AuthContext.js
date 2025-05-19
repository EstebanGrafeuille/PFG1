// // src/context/AuthContext.js
// import { createContext, useState, useEffect } from "react";
// import AsyncStorage from '../services/asyncStorage'; // o la ruta donde lo tengas

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [authData, setAuthDataState] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Cargar datos desde AsyncStorage al iniciar
//   useEffect(() => {
//     AsyncStorage.getData("authData").then((data) => {
//       if (data) setAuthDataState(data);
//       setLoading(false);
//     });
//   }, []);

//   // Guardar en AsyncStorage cada vez que cambia
//   const setAuthData = async (data) => {
//     setAuthDataState(data);
//     if (data) {
//       await AsyncStorage.storeData("authData", data);
//     } else {
//       await AsyncStorage.clearAll();
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authData, setAuthData, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import AsyncStorage from '../services/asyncStorage'; // si usás almacenamiento local
import { Text } from "react-native";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga o recuperar sesión
    AsyncStorage.getData("authData").then((data) => {
      console.log("Encontro algo?")
      if (data) setAuthData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Text>Cargando...</Text>; // Este return sí es válido

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

