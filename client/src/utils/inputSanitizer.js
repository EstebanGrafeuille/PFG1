/**
 * Utilidades para sanitización y validación de datos
 */

/**
 * Sanitiza una cadena de texto para prevenir XSS
 * @param {string} input - Texto a sanitizar
 * @returns {string} - Texto sanitizado
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') return '';

  // Eliminar caracteres potencialmente peligrosos
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
    .replace(/\\/g, '&#x5C;')
    .trim();
};

/**
 * Sanitiza un objeto completo, procesando todas sus propiedades de tipo string
 * @param {Object} obj - Objeto a sanitizar
 * @returns {Object} - Objeto sanitizado
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return {};

  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = sanitizeString(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = sanitizeObject(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};

/**
 * Valida un correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean} - Verdadero si es un correo válido
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña basado en criterios de seguridad
 * @param {string} password - Contraseña a validar
 * @returns {Object} - Objeto con el resultado de validación
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'La contraseña no puede estar vacía' };
  }

  // Al menos 8 caracteres, una letra, un número y un carácter especial
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasMinLength) {
    return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }

  if (!hasLetter || !hasNumber || !hasSpecial) {
    return {
      valid: false,
      message: 'La contraseña debe incluir al menos una letra, un número y un carácter especial'
    };
  }

  return { valid: true };
};

export default {
  sanitizeString,
  sanitizeObject,
  validateEmail,
  validatePassword
};
