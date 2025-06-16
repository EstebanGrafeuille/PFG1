/**
 * Manejador centralizado de errores
 */

/**
 * Códigos de error y sus mensajes amigables para el usuario
 */
const ERROR_MESSAGES = {
  // Errores de autenticación
  'auth/invalid-credentials': 'El email o la contraseña son incorrectos',
  'auth/user-not-found': 'No existe ningún usuario con ese email',
  'auth/email-already-in-use': 'Este email ya está registrado',
  'auth/weak-password': 'La contraseña es demasiado débil',
  'auth/invalid-email': 'El formato del email no es válido',
  'auth/user-disabled': 'Esta cuenta ha sido desactivada',
  'auth/requires-recent-login': 'Por seguridad, inicia sesión nuevamente',
  'auth/expired-token': 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',

  // Errores de red
  'network/no-connection': 'No hay conexión a internet',
  'network/timeout': 'La conexión ha tardado demasiado tiempo',
  'network/server-error': 'Error en el servidor, intenta más tarde',

  // Errores de API
  'api/not-found': 'No se encontró el recurso solicitado',
  'api/bad-request': 'La solicitud no es válida',
  'api/forbidden': 'No tienes permisos para realizar esta acción',
  'api/rate-limit': 'Has excedido el límite de peticiones',

  // Error genérico
  'generic': 'Ha ocurrido un error inesperado'
};

/**
 * Obtiene un mensaje de error amigable para el usuario
 * @param {string} errorCode - El código de error
 * @returns {string} - Mensaje amigable
 */
export const getUserFriendlyMessage = (errorCode) => {
  return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.generic;
};

/**
 * Maneja errores de API y devuelve un objeto con información estructurada
 * @param {Error} error - El error ocurrido
 * @returns {Object} - Objeto con información del error
 */
export const handleApiError = (error) => {
  // Determinar el código de error
  let errorCode = 'generic';

  if (error.message && error.message.includes('network')) {
    errorCode = 'network/no-connection';
  } else if (error.code) {
    errorCode = error.code;
  } else if (error.status) {
    // Manejar códigos de estado HTTP
    switch (error.status) {
      case 400: errorCode = 'api/bad-request'; break;
      case 401: errorCode = 'auth/invalid-credentials'; break;
      case 403: errorCode = 'api/forbidden'; break;
      case 404: errorCode = 'api/not-found'; break;
      case 429: errorCode = 'api/rate-limit'; break;
      case 500: errorCode = 'network/server-error'; break;
      default: errorCode = 'generic';
    }
  }

  // Log detallado solo en desarrollo
  if (__DEV__) {
    console.error('Error detallado:', error);
  } else {
    // En producción solo registrar información esencial
    console.error(`Error: ${errorCode}`);
  }

  return {
    userMessage: getUserFriendlyMessage(errorCode),
    errorCode,
    success: false
  };
};

/**
 * Maneja errores específicos de autenticación
 * @param {Error} error - El error ocurrido
 * @returns {Object} - Objeto con información del error
 */
export const handleAuthError = (error) => {
  let errorCode = 'auth/invalid-credentials';

  // Determinar el tipo específico de error de autenticación
  if (error.message) {
    if (error.message.includes('email') && error.message.includes('already')) {
      errorCode = 'auth/email-already-in-use';
    } else if (error.message.includes('password') && error.message.includes('weak')) {
      errorCode = 'auth/weak-password';
    }
  }

  return {
    userMessage: getUserFriendlyMessage(errorCode),
    errorCode,
    success: false
  };
};

export default {
  handleApiError,
  handleAuthError,
  getUserFriendlyMessage
};
