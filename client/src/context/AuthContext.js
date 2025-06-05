import { createContext, useState, useEffect } from "react";
import AsyncStorage from "../services/asyncStorage";
import { Text } from "react-native";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthDataState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Cargar datos desde AsyncStorage al iniciar
    AsyncStorage.getData("authData").then((data) => {
      console.log("Datos de autenticación encontrados:", data ? "Sí" : "No");
      if (data) {
        console.log("ID de usuario en authData:", data.user?._id);
        setAuthDataState(data);
      }
      setLoading(false);
    });
  }, []);

  // Guardar en AsyncStorage cada vez que cambia
  const setAuthData = async (data) => {
    setAuthDataState(data);
    if (data) {
      await AsyncStorage.storeData("authData", data);
    } else {
      await AsyncStorage.clearAll();
    }
  };

  // Actualizar el perfil de usuario
  const updateUserProfile = (profileData) => {
    console.log("Actualizando perfil en contexto:", profileData);
    setUserProfile({
      ...userProfile,
      ...profileData
    });
  };

  if (loading) return <Text>Cargando...</Text>;

  return (
    <AuthContext.Provider value={{ 
      authData, 
      setAuthData, 
      userProfile, 
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};