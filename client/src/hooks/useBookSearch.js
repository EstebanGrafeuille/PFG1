/**
 * Hook personalizado para manejar la búsqueda de libros
 *
 * @module hooks/useBookSearch
 */
import { useState, useRef, useEffect } from "react";
import { searchBooks } from "../api/booksApi";

/**
 * Hook personalizado para manejar la búsqueda de libros
 * @returns {Object} Estado y funciones para la búsqueda de libros
 */
export default function useBookSearch() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchType, setSearchType] = useState("title"); // "title" o "author"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    previewAvailable: false,
    freeEbooks: false,
    fullBooks: false
  });
  
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
   * Construye la consulta de búsqueda basada en el tipo y categoría
   * @param {string} searchTerm - Término de búsqueda
   * @returns {string} - Consulta formateada
   */
  const buildSearchQuery = (searchTerm) => {
    if (!searchTerm.trim()) return "";
    
    let finalQuery = searchTerm;
    
    // Añadir prefijo según el tipo de búsqueda
    if (searchType === "author") {
      finalQuery = `inauthor:${finalQuery}`;
    } else {
      finalQuery = `intitle:${finalQuery}`;
    }
    
    // Añadir categoría si no es "all"
    if (selectedCategory !== "all") {
      finalQuery += ` subject:${selectedCategory}`;
    }
    
    return finalQuery;
  };

  /**
   * Busca libros con el término de búsqueda proporcionado
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} index - Índice de inicio para paginación
   */
  const fetchBooks = async (searchTerm, index = 0) => {
    if (!searchTerm.trim()) return;
    
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    index === 0 ? setLoading(true) : setLoadingMore(true);

    try {
      const formattedQuery = buildSearchQuery(searchTerm);
      const result = await searchBooks(formattedQuery, index, 40, filters);

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

  /**
   * Actualiza los filtros y realiza una nueva búsqueda
   * @param {Object} newFilters - Nuevos filtros a aplicar
   */
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setStartIndex(0);
    fetchBooks(query, 0);
  };

  /**
   * Actualiza el tipo de búsqueda y realiza una nueva búsqueda
   * @param {string} type - Nuevo tipo de búsqueda
   */
  const updateSearchType = (type) => {
    setSearchType(type);
    if (query.trim()) {
      setStartIndex(0);
      fetchBooks(query, 0);
    }
  };

  /**
   * Actualiza la categoría y realiza una nueva búsqueda
   * @param {string} category - Nueva categoría
   */
  const updateCategory = (category) => {
    setSelectedCategory(category);
    if (query.trim()) {
      setStartIndex(0);
      fetchBooks(query, 0);
    }
  };

  return {
    books,
    query,
    loading,
    loadingMore,
    totalItems,
    searchType,
    filters,
    selectedCategory,
    handleChangeText,
    handleEndReached,
    handleSubmit,
    setQuery,
    updateSearchType,
    updateFilters,
    updateCategory
  };
}