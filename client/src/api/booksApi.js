/**
 * API para interactuar con Google Books
 */

/**
 * Busca libros en la API de Google Books
 * @param {string} query - Término de búsqueda
 * @param {number} startIndex - Índice de inicio para paginación
 * @param {number} maxResults - Número máximo de resultados
 * @returns {Promise<Object>} - Resultados de la búsqueda
 */
export const searchBooks = async (query, startIndex = 0, maxResults = 40) => {
  const trimmed = query.trim();
  if (!trimmed) return { items: [], totalItems: 0 };

  try {
    const url =
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmed)}` +
      `&maxResults=${maxResults}&startIndex=${startIndex}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return {
        items: (data.items || []).map(processBookItem),
        totalItems: data.totalItems || 0
      };
    }
    return { items: [], totalItems: 0, error: "Error en la respuesta" };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { items: [], totalItems: 0, error: error.message };
  }
};

/**
 * Obtiene los detalles de un libro específico
 * @param {string} volumeId - ID del volumen del libro
 * @returns {Promise<Object>} - Detalles del libro
 */
export const getBookDetails = async (volumeId) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
    const data = await response.json();

    // Asegurar que la URL de la imagen sea HTTPS
    if (
      data.volumeInfo?.imageLinks?.thumbnail &&
      data.volumeInfo.imageLinks.thumbnail.startsWith("http:")
    ) {
      data.volumeInfo.imageLinks.thumbnail = data.volumeInfo.imageLinks.thumbnail.replace(
        "http:",
        "https:"
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

/**
 * Procesa un item de libro para normalizar su estructura
 * @param {Object} item - Item de libro de la API
 * @returns {Object} - Item de libro procesado
 */
const processBookItem = (item) => ({
  id: item.id,
  title: item.volumeInfo?.title ?? "Sin título",
  authors: item.volumeInfo?.authors ?? [],
  thumbnail: item.volumeInfo?.imageLinks?.thumbnail
});
