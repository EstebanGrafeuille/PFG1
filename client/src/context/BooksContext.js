/**
 * Contexto para la gestión de libros en la aplicación
 *
 * @module context/BooksContext
 */
import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const BooksContext = createContext();

/**
 * Proveedor del contexto de libros
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} - Proveedor del contexto
 */
export const BooksProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  /**
   * Añadir a favoritos
   * @param {Object} book - Libro a añadir
   */
  const addToFavorites = (book) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  /**
   * Eliminar de favoritos
   * @param {string} bookId - ID del libro a eliminar
   */
  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== bookId));
  };

  /**
   * Añadir a lista de lectura
   * @param {Object} book - Libro a añadir
   */
  const addToReadingList = (book) => {
    setReadingList((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  /**
   * Eliminar de lista de lectura
   * @param {string} bookId - ID del libro a eliminar
   */
  const removeFromReadingList = (bookId) => {
    setReadingList((prev) => prev.filter((item) => item.id !== bookId));
  };

  /**
   * Marcar como leído
   * @param {Object} book - Libro a marcar como leído
   */
  const markAsRead = (book) => {
    setReadBooks((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, { ...book, dateRead: new Date() }];
    });
    // Eliminar de la lista de lectura si estaba allí
    removeFromReadingList(book.id);
  };

  /**
   * Añadir a historial de búsqueda
   * @param {string} query - Término de búsqueda
   */
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10); // Mantener solo los 10 más recientes
    });
  };

  /**
   * Limpiar historial de búsqueda
   */
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  /**
   * Verificar si un libro está en favoritos
   * @param {string} bookId - ID del libro
   * @returns {boolean} - Si el libro está en favoritos
   */
  const isFavorite = (bookId) => {
    return favorites.some((item) => item.id === bookId);
  };

  /**
   * Verificar si un libro está en la lista de lectura
   * @param {string} bookId - ID del libro
   * @returns {boolean} - Si el libro está en la lista de lectura
   */
  const isInReadingList = (bookId) => {
    return readingList.some((item) => item.id === bookId);
  };

  /**
   * Verificar si un libro está marcado como leído
   * @param {string} bookId - ID del libro
   * @returns {boolean} - Si el libro está marcado como leído
   */
  const isRead = (bookId) => {
    return readBooks.some((item) => item.id === bookId);
  };

  const value = {
    favorites,
    readingList,
    readBooks,
    searchHistory,
    addToFavorites,
    removeFromFavorites,
    addToReadingList,
    removeFromReadingList,
    markAsRead,
    addToSearchHistory,
    clearSearchHistory,
    isFavorite,
    isInReadingList,
    isRead
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};

/**
 * Hook para usar el contexto de libros
 * @returns {Object} - Contexto de libros
 */
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks debe usarse dentro de un BooksProvider");
  }
  return context;
};

export default BooksContext;
