/**
 * Pantalla de detalles de libro
 * Muestra información detallada sobre un libro específico
 * 
 * @module screens/searchScreens/DetailBookScreen
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
// Importaciones actualizadas para la nueva estructura
import useBookDetails from '../../hooks/useBookDetails';
import { LoadingIndicator } from '../../components/ui/LoadingIndicator';
import Colors from '../../constants/colors';
import Layout from '../../constants/layout';
import { useBooks } from '../../context/BooksContext';
import { formatDate, getLanguageName } from '../../utils/helpers';

/**
 * Pantalla de detalles de libro
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.route - Objeto de ruta con parámetros
 * @param {Object} props.route.params - Parámetros de la ruta
 * @param {string} props.route.params.volumeId - ID del volumen del libro
 * @returns {JSX.Element} - Componente de pantalla de detalles
 */
const DetailBook = ({ route }) => {
  const { volumeId } = route.params;
  const { details, loading, error } = useBookDetails(volumeId);
  const { 
    addToFavorites, 
    addToReadingList, 
    isFavorite, 
    isInReadingList 
  } = useBooks();

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  if (error || !details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'No se encontraron detalles del libro'}
        </Text>
      </View>
    );
  }

  const info = details.volumeInfo;
  
  // Preparar objeto de libro para guardar en listas
  const bookData = {
    id: details.id,
    title: info.title,
    authors: info.authors || [],
    thumbnail: info.imageLinks?.thumbnail,
    publishedDate: info.publishedDate
  };

  // Manejar añadir a favoritos o lista de lectura
  const handleAddBook = () => {
    // Aquí se podría mostrar un modal con opciones
    addToReadingList(bookData);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Cabecera con imagen y datos básicos */}
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            {info.imageLinks?.thumbnail ? (
              <Image 
                source={{ uri: info.imageLinks.thumbnail }} 
                style={styles.bookCover} 
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>{info.title ? info.title.substring(0, 1) : "?"}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{info.title}</Text>
            {info.authors && (
              <Text style={styles.authors}>{info.authors.join(', ')}</Text>
            )}
            {info.publishedDate && (
              <Text style={styles.publishedDate}>Publicado: {formatDate(info.publishedDate)}</Text>
            )}
            {info.categories && (
              <View style={styles.categoriesContainer}>
                {info.categories.map((category, index) => (
                  <View key={index} style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        
        {/* Sección de descripción */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          {info.description ? (
            <Text style={styles.description}>{info.description}</Text>
          ) : (
            <Text style={styles.noInfo}>No hay descripción disponible</Text>
          )}
        </View>
        
        {/* Sección de detalles */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Detalles</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Editorial:</Text>
            <Text style={styles.detailValue}>{info.publisher || 'No disponible'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Páginas:</Text>
            <Text style={styles.detailValue}>{info.pageCount || 'No disponible'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Idioma:</Text>
            <Text style={styles.detailValue}>{getLanguageName(info.language) || 'No disponible'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ISBN:</Text>
            <Text style={styles.detailValue}>
              {info.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 
               info.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || 
               'No disponible'}
            </Text>
          </View>
        </View>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      {/* Botón flotante para añadir a listas */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        activeOpacity={0.8}
        onPress={handleAddBook}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla de detalles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 140,
  },
  bottomSpace: {
    height: 80,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.SPACING.L,
  },
  errorText: {
    fontSize: Layout.FONT_SIZE.L,
    color: Colors.ERROR,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: Layout.SPACING.L,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 2,
    borderBottomColor: Colors.PRIMARY,
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: Layout.BORDER_RADIUS.M,
    overflow: 'hidden',
    backgroundColor: Colors.PLACEHOLDER,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 40,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.WHITE,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Layout.SPACING.L,
    justifyContent: 'center',
  },
  title: {
    fontSize: Layout.FONT_SIZE.XL,
    fontWeight: Layout.FONT_WEIGHT.BLACK,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M,
  },
  authors: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_SECONDARY,
    marginBottom: Layout.SPACING.M,
  },
  publishedDate: {
    fontSize: Layout.FONT_SIZE.S,
    color: Colors.TEXT_TERTIARY,
    marginBottom: Layout.SPACING.M,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.SPACING.XS,
  },
  categoryBadge: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: Layout.SPACING.M,
    paddingVertical: Layout.SPACING.XS,
    borderRadius: Layout.BORDER_RADIUS.L,
    marginRight: Layout.SPACING.XS,
    marginBottom: Layout.SPACING.XS,
  },
  categoryText: {
    fontSize: Layout.FONT_SIZE.XS,
    color: Colors.TEXT_PRIMARY,
  },
  infoSection: {
    padding: Layout.SPACING.L,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  sectionTitle: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M,
  },
  description: {
    fontSize: Layout.FONT_SIZE.M,
    lineHeight: 20,
    color: Colors.TEXT_PRIMARY,
  },
  noInfo: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_TERTIARY,
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Layout.SPACING.S,
  },
  detailLabel: {
    fontSize: Layout.FONT_SIZE.M,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    width: 80,
  },
  detailValue: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_SECONDARY,
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: Layout.SPACING.L,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    fontSize: Layout.FONT_SIZE.XXL,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.WHITE,
  },
});

export default DetailBook;