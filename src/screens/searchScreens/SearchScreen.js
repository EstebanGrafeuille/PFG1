/**
 * Pantalla de búsqueda de libros
 * Permite buscar libros en la API de Google Books y mostrarlos en una lista
 * 
 * @module screens/searchScreens/SearchScreen
 */
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform
} from 'react-native';
// Importaciones actualizadas para la nueva estructura
import BookItem from '../../components/BookItem';
import useBookSearch from '../../hooks/useBookSearch';
import { LoadingIndicator, LoadingFooter } from '../../components/ui/LoadingIndicator';
import SearchBar from '../../components/ui/SearchBar';
import Colors from '../../constants/colors';
import Layout from '../../constants/layout';

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
    handleChangeText,
    handleEndReached,
    handleSubmit
  } = useBookSearch();

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <SearchBar 
        value={query} 
        onChangeText={handleChangeText} 
        onSubmit={handleSubmit} 
      />
      
      {/* Mostrar indicador de carga o lista de libros */}
      {loading && books.length === 0 ? (
        <LoadingIndicator fullScreen />
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id}
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
    paddingTop: Platform.OS === 'ios' ? 50 : Layout.SPACING.L 
  }
});

export default SearchScreen;