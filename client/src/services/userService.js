import errorHandler from '../utils/errorHandler';
import inputSanitizer from '../utils/inputSanitizer';
import secureStorage from '../utils/secureStorage';
import AsyncStorage from './asyncStorage';
import BASE_URL from './connection';

export const getUserProfile = async (userId) => {
  try {
    // Intentar obtener datos de autenticación desde almacenamiento seguro primero
    let authData = await secureStorage.getSecureItem('authData');

    // Verificar si el token ha expirado
    if (authData && authData.expiresAt && secureStorage.isTokenExpired(authData.expiresAt)) {
      console.log('Token expirado, intentando renovar sesión');
      throw new Error('auth/expired-token');
    }

    // Si no hay datos en almacenamiento seguro, verificar en AsyncStorage (migración)
    if (!authData) {
      authData = await AsyncStorage.getData('authData');

      // Si encontramos datos en AsyncStorage, migrarlos a almacenamiento seguro
      if (authData && authData.token) {
        await secureStorage.saveSecureItem('authData', {
          ...authData,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
        await AsyncStorage.removeItem('authData');
      }
    }

    if (!authData || !authData.token) {
      throw new Error('auth/invalid-credentials');
    }

    // Sanitizar y validar userId
    if (!userId) {
      console.error('ID de usuario no proporcionado');
      throw new Error('api/bad-request');
    }

    const sanitizedUserId = inputSanitizer.sanitizeString(userId);

    console.log(`Obteniendo perfil de usuario: ${BASE_URL}/users/${sanitizedUserId}`);
    console.log('Token de autenticación disponible:', !!authData.token);

    const response = await fetch(`${BASE_URL}/users/${sanitizedUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`,
        'X-Requested-With': 'XMLHttpRequest' // Protección CSRF
      },
      credentials: 'include' // Incluir cookies en la solicitud
    });

    console.log('Respuesta del servidor para obtener perfil:', response.status);
    const data = await response.json();

    if (!response.ok) {
      // Manejar códigos de estado específicos
      if (response.status === 401) {
        // Token inválido o expirado
        await secureStorage.removeSecureItem('authData');
        throw new Error('auth/expired-token');
      }
      throw new Error(data.message || `api/error-${response.status}`);
    }

    // Sanitizar datos sensibles antes de procesarlos
    const sanitizedData = inputSanitizer.sanitizeObject(data.message);

    // Verificar si el perfil incluye biografía e imagen
    console.log('Perfil completo:', {
      ...sanitizedData,
      hasBiography: !!sanitizedData.biography,
      hasImage: !!sanitizedData.image
    });

    return sanitizedData;
  } catch (error) {
    console.error('Error en getUserProfile:', error);
    const errorInfo = errorHandler.handleApiError(error);

    // Si el error es de token expirado, podríamos manejar renovación de token aquí
    // o simplemente propagar el error para que se maneje en el componente

    throw {
      ...errorInfo,
      originalError: __DEV__ ? error : undefined // Solo incluir en desarrollo
    };
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const authData = await AsyncStorage.getData('authData');
    if (!authData || !authData.token) {
      throw new Error('No hay sesión activa');
    }

    // Verificar que tenemos un ID de usuario válido
    if (!userId) {
      console.error('ID de usuario no proporcionado');
      throw new Error('ID de usuario no proporcionado');
    }

    console.log(`Actualizando perfil de usuario: ${BASE_URL}/users/${userId}`);
    console.log('Datos a enviar:', userData);
    console.log('Token de autenticación disponible:', !!authData.token);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`
      },
      body: JSON.stringify(userData)
    });

    console.log('Respuesta del servidor:', response.status);
    const data = await response.json();
    console.log('Datos de respuesta:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar perfil de usuario');
    }

    try {
      // Invalidar solo la caché del perfil, no toda la sesión
      await AsyncStorage.storeData('userProfileCache', null);
    } catch (cacheError) {
      console.log('Error al limpiar caché:', cacheError);
    }

    return data.message;
  } catch (error) {
    console.error('Error en updateUserProfile:', error);
    throw error;
  }
};

export const updateUserImage = async (userId, imageUrl = null) => {
  try {
    const authData = await AsyncStorage.getData('authData');
    if (!authData || !authData.token) {
      throw new Error('No hay sesión activa');
    }

    // Verificar que tenemos un ID de usuario válido
    if (!userId) {
      console.error('ID de usuario no proporcionado');
      throw new Error('ID de usuario no proporcionado');
    }

    let finalImageUrl = imageUrl;

    // Si no se proporciona una URL de imagen, generar un avatar
    if (!imageUrl) {
      console.log(`Generando avatar para usuario: ${BASE_URL}/users/${userId}`);

      // Generar un color aleatorio para el fondo del avatar
      const randomColor = Math.floor(Math.random()*16777215).toString(16);

      // Usar una URL de avatar generada con UI Avatars
      finalImageUrl = "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(authData.user.username || "User") +
        "&background=" + randomColor + "&color=fff&size=200";

      console.log('URL de avatar generada:', finalImageUrl);

      // Actualizar el perfil con la URL del avatar
      return await updateProfileWithImage(userId, finalImageUrl, authData.token);
    }

    // Si la URL comienza con "data:", es una imagen en base64
    if (imageUrl && imageUrl.startsWith('data:')) {
      console.log('Usando imagen en formato base64');

      // Actualizar el perfil con la URL de datos
      return await updateProfileWithImage(userId, imageUrl, authData.token);
    }

    console.log('Usando URL de imagen proporcionada:', imageUrl);
    return await updateProfileWithImage(userId, imageUrl, authData.token);
  } catch (error) {
    console.error('Error en updateUserImage:', error);
    throw error;
  }
};

// Función auxiliar para actualizar el perfil con una imagen
const updateProfileWithImage = async (userId, imageUrl, token) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      image: imageUrl
    })
  });

  console.log('Respuesta del servidor:', response.status);
  const data = await response.json();
  console.log('Datos de respuesta:', data);

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar imagen de perfil');
  }

  try {
    // Invalidar la caché del perfil usando removeItem si está disponible
    if (AsyncStorage.removeItem) {
      await AsyncStorage.removeItem('userProfileCache');
    } else {
      // Alternativa: sobrescribir con un objeto vacío
      await AsyncStorage.storeData('userProfileCache', {});
    }
  } catch (cacheError) {
    console.log('Error al limpiar caché:', cacheError);
  }

  return data.message;
};
