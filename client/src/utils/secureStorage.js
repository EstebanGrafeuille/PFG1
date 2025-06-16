/**
 * Módulo de almacenamiento seguro para datos sensibles
 * Utiliza SecureStore para almacenar información sensible como tokens y credenciales
 */
import * as SecureStore from 'expo-secure-store';

/**
 * Guarda un elemento de forma segura
 * @param {string} key - Clave para identificar el elemento
 * @param {any} value - Valor a guardar (se convertirá a string si es un objeto)
 * @returns {Promise<boolean>} - Verdadero si se guardó correctamente
 */
export const saveSecureItem = async (key, value) => {
  try {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
    await SecureStore.setItemAsync(key, valueToStore);
    return true;
  } catch (error) {
    console.error("Error al guardar datos seguros:", error);
    return false;
  }
};

/**
 * Obtiene un elemento guardado de forma segura
 * @param {string} key - Clave del elemento a obtener
 * @returns {Promise<any>} - El valor almacenado (o null si hay error o no existe)
 */
export const getSecureItem = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (!value) return null;

    try {
      // Intentar convertir a JSON si es posible
      return JSON.parse(value);
    } catch (e) {
      // Si no es JSON, devolver como string
      return value;
    }
  } catch (error) {
    console.error("Error al obtener datos seguros:", error);
    return null;
  }
};

/**
 * Elimina un elemento guardado de forma segura
 * @param {string} key - Clave del elemento a eliminar
 * @returns {Promise<boolean>} - Verdadero si se eliminó correctamente
 */
export const removeSecureItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    console.error("Error al eliminar datos seguros:", error);
    return false;
  }
};

/**
 * Verifica si un token ha expirado
 * @param {number|string} expiresAt - Timestamp o fecha ISO de expiración
 * @returns {boolean} - Verdadero si el token ha expirado
 */
export const isTokenExpired = (expiresAt) => {
  if (!expiresAt) return true;

  const expiryDate = typeof expiresAt === 'string'
    ? new Date(expiresAt)
    : new Date(expiresAt * 1000);

  return expiryDate <= new Date();
};

export default {
  saveSecureItem,
  getSecureItem,
  removeSecureItem,
  isTokenExpired
};
