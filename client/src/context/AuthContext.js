import { createContext, useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "../services/asyncStorage";
import secureStorage from "../utils/secureStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthDataState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Cargar datos desde SecureStore al iniciar
    const loadAuthData = async () => {
      try {
        // Intentar obtener datos desde el almacenamiento seguro
        const data = await secureStorage.getSecureItem("authData");

        console.log("Datos de autenticación encontrados:", data ? "Sí" : "No");
        if (data) {
          // Verificar si el token ha expirado
          if (data.expiresAt && secureStorage.isTokenExpired(data.expiresAt)) {
            console.log("Token expirado, cerrando sesión");
            await secureStorage.removeSecureItem("authData");
            setLoading(false);
            return;
          }

          console.log("ID de usuario en authData:", data.user?.id || data.user?._id);
          // Normalizar el formato del usuario para asegurarnos que siempre esté disponible como _id
          const normalizedData = {
            ...data,
            user: data.user ? {
              ...data.user,
              _id: data.user.id || data.user._id  // Asegurarnos que _id siempre esté disponible
            } : null
          };
          setAuthDataState(normalizedData);
        } else {
          // Fallback: verificar si hay datos en AsyncStorage (migración)
          const legacyData = await AsyncStorage.getData("authData");
          if (legacyData) {
            console.log("Migrando datos de autenticación a almacenamiento seguro");

            // Normalizar el formato del usuario para legacyData también
            const normalizedLegacyData = {
              ...legacyData,
              user: legacyData.user ? {
                ...legacyData.user,
                _id: legacyData.user.id || legacyData.user._id
              } : null,
              // Añadir fecha de expiración (30 días)
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            };

            await secureStorage.saveSecureItem("authData", normalizedLegacyData);
            await AsyncStorage.removeItem("authData");
            setAuthDataState(normalizedLegacyData);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos de autenticación:", error);
      }
      setLoading(false);
    };

    loadAuthData();
  }, []);

  // Guardar en SecureStore cada vez que cambia
  const setAuthData = async (data) => {
    try {
      if (data) {
        // Normalizar formato de usuario y añadir fecha de expiración si no existe
        const normalizedData = {
          ...data,
          user: data.user ? {
            ...data.user,
            _id: data.user.id || data.user._id // Asegurarnos que _id siempre está disponible
          } : null,
          expiresAt: data.expiresAt ||
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        console.log("Guardando datos de autenticación normalizados:", {
          hasUserId: !!normalizedData.user?._id,
          username: normalizedData.user?.username
        });

        setAuthDataState(normalizedData);

        // Usar los datos normalizados para almacenamiento
        const secureData = {
          ...normalizedData,
          expiresAt: normalizedData.expiresAt
        };
        await secureStorage.saveSecureItem("authData", secureData);
        await AsyncStorage.removeItem("authData"); // Eliminar datos antiguos
      } else {
        await secureStorage.removeSecureItem("authData");
        await AsyncStorage.clearAll();
      }
    } catch (error) {
      console.error("Error al guardar datos de autenticación:", error);
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
