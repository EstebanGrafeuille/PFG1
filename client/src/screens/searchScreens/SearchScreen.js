/**
 * Pantalla de búsqueda de libros
 * Permite buscar libros en la API de Google Books y mostrarlos en una lista
 *
 * @module screens/searchScreens/SearchScreen
 */
import React, { useState } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
// Importaciones actualizadas para la nueva estructura
import BookItem from "../../components/BookItem";
import useBookSearch from "../../hooks/useBookSearch";
import { LoadingIndicator, LoadingFooter } from "../../components/ui/LoadingIndicator";
import SearchBar from "../../components/ui/SearchBar";
import FilterModal from "../../components/ui/FilterModal";
import CategorySelector from "../../components/ui/CategorySelector";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";

/**
 * Pantalla de búsqueda de libros
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.navigation - Objeto de navegación
 * @returns {JSX.Element} - Componente de pantalla de búsqueda
 */
const SearchScreen = ({ navigation }) => {
  // Usar el hook personalizado para la búsqueda de libros
  const { 
    books, 
    query, 
    loading, 
    loadingMore, 
    searchType,
    filters,
    selectedCategory,
    handleChangeText, 
    handleEndReached, 
    handleSubmit,
    updateSearchType,
    updateFilters,
    updateCategory
  } = useBookSearch();

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Función para manejar el cambio de tipo de búsqueda
  const handleSearchTypeChange = (type) => {
    updateSearchType(type);
    setIsTypeDropdownOpen(false);
  };

  // Función para manejar la apertura/cierre del dropdown
  const handleToggleTypeDropdown = (isOpen) => {
    setIsTypeDropdownOpen(isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda con selector de tipo y botón de filtros */}
      <View style={[styles.searchBarContainer, isTypeDropdownOpen && styles.elevatedContainer]}>
        <SearchBar 
          value={query} 
          onChangeText={handleChangeText} 
          onSubmit={handleSubmit}
          searchType={searchType}
          onSearchTypeChange={handleSearchTypeChange}
          onFilterPress={() => setFilterModalVisible(true)}
          onTypeDropdownToggle={handleToggleTypeDropdown}
        />
      </View>

      {/* Selector de categorías */}
      <CategorySelector 
        selectedCategory={selectedCategory}
        onSelectCategory={updateCategory}
      />

      {/* Modal de filtros */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={updateFilters}
      />

      {/* Mostrar indicador de carga o lista de libros */}
      {loading && books.length === 0 ? (
        <LoadingIndicator fullScreen />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookItem item={item} navigation={navigation} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<LoadingFooter loading={loadingMore} />}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

/**
 * Estilos para la pantalla de búsqueda
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: Layout.SPACING.L,
    paddingTop: Platform.OS === "ios" ? 50 : Layout.SPACING.L
  },
  searchBarContainer: {
    zIndex: 1,
  },
  elevatedContainer: {
    zIndex: 1000,
  }
});

export default SearchScreen;