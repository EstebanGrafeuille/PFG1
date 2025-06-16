import AsyncStorage from "./asyncStorage";
import BASE_URL from "./connection";

export const getUserProfile = async (userId) => {
  try {
    const authData = await AsyncStorage.getData("authData");
    if (!authData || !authData.token) {
      throw new Error("No hay sesión activa");
    }

    // Verificar que tenemos un ID de usuario válido
    if (!userId) {
      console.error("ID de usuario no proporcionado");
      throw new Error("ID de usuario no proporcionado");
    }

    console.log(`Obteniendo perfil de usuario: ${BASE_URL}/users/${userId}`);
    console.log("Token de autenticación disponible:", !!authData.token);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener perfil de usuario");
    }

    // Verificar si el perfil incluye biografía e imagen
    console.log("Perfil completo:", {
      ...data.message,
      hasBiography: !!data.message.biography,
      hasImage: !!data.message.image
    });

    return data.message;
  } catch (error) {
    console.error("Error en getUserProfile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const authData = await AsyncStorage.getData("authData");
    if (!authData || !authData.token) {
      throw new Error("No hay sesión activa");
    }

    // Verificar que tenemos un ID de usuario válido
    if (!userId) {
      console.error("ID de usuario no proporcionado");
      throw new Error("ID de usuario no proporcionado");
    }

    console.log(`Actualizando perfil de usuario: ${BASE_URL}/users/${userId}`);
    console.log("Datos a enviar:", userData);
    console.log("Token de autenticación disponible:", !!authData.token);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`
      },
      body: JSON.stringify(userData)
    });

    console.log("Respuesta del servidor:", response.status);
    const data = await response.json();
    console.log("Datos de respuesta:", data);

    if (!response.ok) {
      throw new Error(data.message || "Error al actualizar perfil de usuario");
    }

    try {
      // Invalidar solo la caché del perfil, no toda la sesión
      await AsyncStorage.storeData("userProfileCache", null);
    } catch (cacheError) {
      console.log("Error al limpiar caché:", cacheError);
    }

    return data.message;
  } catch (error) {
    console.error("Error en updateUserProfile:", error);
    throw error;
  }
};

export const updateUserImage = async (userId, imageUrl = null) => {
  try {
    const authData = await AsyncStorage.getData("authData");
    if (!authData || !authData.token) {
      throw new Error("No hay sesión activa");
    }

    // Verificar que tenemos un ID de usuario válido
    if (!userId) {
      console.error("ID de usuario no proporcionado");
      throw new Error("ID de usuario no proporcionado");
    }

    let finalImageUrl = imageUrl;

    // Si no se proporciona una URL de imagen, generar un avatar
    if (!imageUrl) {
      console.log(`Generando avatar para usuario: ${BASE_URL}/users/${userId}`);

      // Generar un color aleatorio para el fondo del avatar
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      // Usar una URL de avatar generada con UI Avatars
      finalImageUrl =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(authData.user.username || "User") +
        "&background=" +
        randomColor +
        "&color=fff&size=200";

      console.log("URL de avatar generada:", finalImageUrl);

      // Actualizar el perfil con la URL del avatar
      return await updateProfileWithImage(userId, finalImageUrl, authData.token);
    }

    // Si la URL comienza con "data:", es una imagen en base64
    if (imageUrl && imageUrl.startsWith("data:")) {
      console.log("Usando imagen en formato base64");

      // Actualizar el perfil con la URL de datos
      return await updateProfileWithImage(userId, imageUrl, authData.token);
    }

    console.log("Usando URL de imagen proporcionada:", imageUrl);
    return await updateProfileWithImage(userId, imageUrl, authData.token);
  } catch (error) {
    console.error("Error en updateUserImage:", error);
    throw error;
  }
};

// Función auxiliar para actualizar el perfil con una imagen
const updateProfileWithImage = async (userId, imageUrl, token) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      image: imageUrl
    })
  });

  console.log("Respuesta del servidor:", response.status);
  const data = await response.json();
  console.log("Datos de respuesta:", data);

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar imagen de perfil");
  }

  try {
    // Invalidar la caché del perfil usando removeItem si está disponible
    if (AsyncStorage.removeItem) {
      await AsyncStorage.removeItem("userProfileCache");
    } else {
      // Alternativa: sobrescribir con un objeto vacío
      await AsyncStorage.storeData("userProfileCache", {});
    }
  } catch (cacheError) {
    console.log("Error al limpiar caché:", cacheError);
  }

  return data.message;
};
