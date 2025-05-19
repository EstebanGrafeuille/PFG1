/**
 * Hook personalizado para obtener detalles de un libro
 * 
 * @module hooks/useBookDetails
 */
import { useState, useEffect } from 'react';
import { getBookDetails } from '../api/booksApi';

// Comentario para desarrolladores:
// TODO: Cuando se complete la migración, actualizar las importaciones a:
// import { getBookDetails } from './api/booksApi';

/**
 * Hook personalizado para obtener detalles de un libro
 * @param {string} volumeId - ID del volumen del libro
 * @returns {Object} Estado y datos del libro
 * @returns {Object} details - Detalles del libro
 * @returns {boolean} loading - Si está cargando los detalles
 * @returns {string|null} error - Mensaje de error, si existe
 */
export default function useBookDetails(volumeId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Función para obtener los detalles del libro
     */
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const data = await getBookDetails(volumeId);
        setDetails(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('No se pudieron cargar los detalles del libro');
      } finally {
        setLoading(false);
      }
    };

    if (volumeId) {
      fetchBookDetails();
    }
  }, [volumeId]);

  return {
    details,
    loading,
    error
  };
}