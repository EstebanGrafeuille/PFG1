/**
 * Hook personalizado para manejar la búsqueda de libros
 *
 * @module hooks/useBookSearch
 */
import { useState, useRef, useEffect } from "react";
import { searchBooks } from "../api/booksApi";

// Comentario para desarrolladores:
// TODO: Cuando se complete la migración, actualizar las importaciones a:
// import { searchBooks } from './api/booksApi';

/**
 * Hook personalizado para manejar la búsqueda de libros
 * @returns {Object} Estado y funciones para la búsqueda de libros
 * @returns {Array} books - Lista de libros encontrados
 * @returns {string} query - Término de búsqueda actual
 * @returns {boolean} loading - Si está cargando la búsqueda inicial
 * @returns {boolean} loadingMore - Si está cargando más resultados
 * @returns {Function} handleChangeText - Función para manejar cambios en el texto de búsqueda
 * @returns {Function} handleEndReached - Función para manejar cuando se llega al final de la lista
 * @returns {Function} handleSubmit - Función para manejar el envío del formulario de búsqueda
 * @returns {Function} setQuery - Función para establecer el término de búsqueda directamente
 */
export default function useBookSearch() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const debounceTimer = useRef(null);
  const abortControllerRef = useRef(null);

  // Limpiar timers y controladores al desmontar
  useEffect(
    () => () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    },
    []
  );

  /**
   * Busca libros con el término de búsqueda proporcionado
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} index - Índice de inicio para paginación
   */
  const fetchBooks = async (searchTerm, index = 0) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    index === 0 ? setLoading(true) : setLoadingMore(true);

    try {
      const result = await searchBooks(searchTerm, index);

      if (!controller.signal.aborted) {
        setBooks((prev) => (index === 0 ? result.items : [...prev, ...result.items]));
        setTotalItems(result.totalItems);
        setStartIndex(index + result.items.length);
      }
    } catch (e) {
      if (e.name !== "AbortError") console.error("Error en useBookSearch:", e);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  /**
   * Maneja el cambio de texto en la búsqueda con debounce
   * @param {string} text - Texto de búsqueda
   */
  const handleChangeText = (text) => {
    setQuery(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setStartIndex(0);
      fetchBooks(text, 0);
    }, 500);
  };

  /**
   * Carga más resultados cuando se llega al final de la lista
   */
  const handleEndReached = () => {
    if (!loading && !loadingMore && books.length < totalItems) {
      fetchBooks(query, startIndex);
    }
  };

  /**
   * Maneja el envío del formulario de búsqueda
   */
  const handleSubmit = () => {
    setStartIndex(0);
    fetchBooks(query, 0);
  };

  return {
    books,
    query,
    loading,
    loadingMore,
    totalItems,
    handleChangeText,
    handleEndReached,
    handleSubmit,
    setQuery
  };
}
