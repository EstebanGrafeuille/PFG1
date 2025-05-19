/**
 * Funciones de utilidad para la aplicación
 * 
 * @module utils/helpers
 */

/**
 * Formatea una fecha en formato ISO a formato legible
 * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Fecha desconocida';
  
  // Si solo tenemos el año o año-mes
  if (dateString.length <= 7) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Trunca un texto si excede la longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Convierte un código de idioma ISO a nombre completo
 * @param {string} langCode - Código de idioma ISO (ej: 'en', 'es')
 * @returns {string} - Nombre del idioma
 */
export const getLanguageName = (langCode) => {
  const languages = {
    en: 'Inglés',
    es: 'Español',
    fr: 'Francés',
    de: 'Alemán',
    it: 'Italiano',
    pt: 'Portugués',
    ru: 'Ruso',
    zh: 'Chino',
    ja: 'Japonés',
    ko: 'Coreano'
  };
  
  return languages[langCode] || langCode;
};