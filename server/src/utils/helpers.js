/**
 * Formatea una fecha a string legible
 * @param {Date} date - Fecha a formatear
 * @returns {String} - Fecha formateada
 */
exports.formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Valida un email
 * @param {String} email - Email a validar
 * @returns {Boolean} - Si el email es válido
 */
exports.isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
