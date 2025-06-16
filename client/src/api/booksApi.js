/**
 * API para interactuar con Google Books
 */

/**
 * Busca libros en la API de Google Books
 * @param {string} query - Término de búsqueda
 * @param {number} startIndex - Índice    // Asegurar que volumeInfo y sus propiedades principales siempre existan
    const normalizedData = {
      ...sanitizedData,
      volumeInfo: {
        ...sanitizedData.volumeInfo,
        authors: Array.isArray(sanitizedData.volumeInfo?.authors)
          ? sanitizedData.volumeInfo.authors
          : [],
        categories: Array.isArray(sanitizedData.volumeInfo?.categories)
          ? sanitizedData.volumeInfo.categories
          : [],
        industryIdentifiers: Array.isArray(sanitizedData.volumeInfo?.industryIdentifiers)
          ? sanitizedData.volumeInfo.industryIdentifiers
          : [],
        imageLinks: sanitizedData.volumeInfo?.imageLinks || {}
      }
    };a paginación
 * @param {number} maxResults - Número máximo de resultados
 * @param {Object} filters - Filtros adicionales para la búsqueda
 * @returns {Promise<Object>} - Resultados de la búsqueda
 */
import errorHandler from '../utils/errorHandler';
import inputSanitizer from '../utils/inputSanitizer';

/**
 * Busca libros en la API de Google Books
 * @param {string} query - Término de búsqueda
 * @param {number} startIndex - Índice de inicio para paginación
 * @param {number} maxResults - Número máximo de resultados
 * @param {Object} filters - Filtros adicionales para la búsqueda
 * @returns {Promise<Object>} - Resultados de la búsqueda
 */
export const searchBooks = async (query, startIndex = 0, maxResults = 40, filters = {}) => {
  // Sanitizar la consulta antes de procesarla
  const sanitizedQuery = inputSanitizer.sanitizeString(query);
  const trimmed = sanitizedQuery.trim();

  if (!trimmed) return { items: [], totalItems: 0 };

  // Validar parámetros numéricos
  const validStartIndex = isNaN(startIndex) ? 0 : Math.max(0, parseInt(startIndex));
  const validMaxResults = isNaN(maxResults) ? 40 : Math.min(40, Math.max(1, parseInt(maxResults)));

  try {
    // Construir URL con parámetros sanitizados
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmed)}` +
      `&maxResults=${validMaxResults}&startIndex=${validStartIndex}`;

    // Añadir parámetros de filtro a la URL
    // Solo agregar filtros válidos
    const safeFilters = inputSanitizer.sanitizeObject(filters);

    if (safeFilters.freeEbooks) {
      url += "&filter=free-ebooks";
    }

    if (safeFilters.fullBooks) {
      url += "&filter=full";
    }

    if (safeFilters.previewAvailable) {
      url += "&filter=partial";
    }

    console.log(`Buscando con URL: ${url}`);

    // Uso de AbortController para establecer un timeout en la solicitud
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId); // Limpiar timeout si la respuesta llega a tiempo

    if (response.ok) {
      const data = await response.json();

      // Procesar y sanitizar resultados
      const processedItems = data.items
        ? data.items.map(item => {
            const processed = processBookItem(item);
            return inputSanitizer.sanitizeObject(processed);
          })
        : [];

      return {
        items: processedItems,
        totalItems: data.totalItems || 0,
        success: true
      };
    }

    // Manejar errores de respuesta HTTP
    const errorInfo = {
      status: response.status,
      statusText: response.statusText
    };

    try {
      const errorData = await response.json();
      errorInfo.message = errorData.error?.message || "Error en la respuesta";
    } catch (_) {
      errorInfo.message = "No se pudo procesar la respuesta";
    }

    console.warn("Error en respuesta de API:", errorInfo);

    return {
      items: [],
      totalItems: 0,
      error: errorInfo.message,
      success: false
    };
  } catch (error) {
    console.error("Error fetching books:", error);

    // Manejar error de timeout
    if (error.name === 'AbortError') {
      return {
        items: [],
        totalItems: 0,
        error: "La búsqueda tardó demasiado tiempo. Por favor, intenta de nuevo.",
        code: "network/timeout",
        success: false
      };
    }

    // Usar manejador centralizado de errores
    const errorInfo = errorHandler.handleApiError(error);

    return {
      items: [],
      totalItems: 0,
      error: errorInfo.userMessage,
      code: errorInfo.errorCode,
      success: false
    };
  }
};

/**
 * Obtiene los detalles de un libro específico
 * @param {string} volumeId - ID del volumen del libro
 * @returns {Promise<Object>} - Detalles del libro
 */
/**
 * Obtiene los detalles de un libro específico
 * @param {string} volumeId - ID del volumen del libro
 * @returns {Promise<Object>} - Detalles del libro
 */
export const getBookDetails = async (volumeId) => {
  try {
    // Sanitizar el ID del volumen
    const sanitizedVolumeId = inputSanitizer.sanitizeString(volumeId);
    if (!sanitizedVolumeId) {
      throw new Error("ID de libro no válido");
    }

    // Uso de AbortController para establecer un timeout en la solicitud
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(sanitizedVolumeId)}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId); // Limpiar timeout si la respuesta llega a tiempo

    if (!response.ok) {
      throw new Error(`Error al obtener detalles del libro: ${response.status}`);
    }

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

    // Sanitizar datos y normalizar la estructura
    const sanitizedData = inputSanitizer.sanitizeObject(data);

    // Asegurar que volumeInfo y sus propiedades principales siempre existan
    const normalizedData = {
      ...sanitizedData,
      volumeInfo: {
        ...sanitizedData.volumeInfo,
        authors: Array.isArray(sanitizedData.volumeInfo?.authors)
          ? sanitizedData.volumeInfo.authors
          : [],
        categories: Array.isArray(sanitizedData.volumeInfo?.categories)
          ? sanitizedData.volumeInfo.categories
          : [],
        imageLinks: sanitizedData.volumeInfo?.imageLinks || {}
      }
    };

    return normalizedData;
  } catch (error) {
    console.error("Error fetching book details:", error);

    // Manejar error de timeout
    if (error.name === 'AbortError') {
      throw new Error("La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.");
    }

    const errorInfo = errorHandler.handleApiError(error);
    throw new Error(errorInfo.userMessage);
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
