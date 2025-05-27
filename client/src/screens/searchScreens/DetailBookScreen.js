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
  SafeAreaView,
  Pressable,
  Alert
} from 'react-native';
// Importaciones actualizadas para la nueva estructura
import useBookDetails from '../../hooks/useBookDetails';
import { LoadingIndicator } from '../../components/ui/LoadingIndicator';
import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();

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
          <Pressable onPress={() => navigation.navigate('Home')}>
              <View style={styles.buttonContainer}>
                  <Image source={require("../../../assets/img/back-icon-white.png")} style={styles.icon}/>
              </View>
          </Pressable>       
          <View style={styles.headerInfo}>
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
            <View style={styles.headerRight}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{info.title}</Text>
                {info.authors && (
                  <Text style={styles.authors}>{info.authors.join(', ')}</Text>
                )}
              </View>
              {info.publishedDate && (
                <Text style={styles.publishedDate}>{formatDate(info.publishedDate)}</Text>
              )}
              <Image source={require("../../../assets/img/stars-static.png")} style={styles.stars}/>
              {info.categories && (
                <View style={styles.categoriesContainer}>
                  {info.categories.length > 0 && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{info.categories[0]}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Sección de descripción */}
        <View style={styles.infoSection}>
          <View style={styles.buttonRow}>
              <Pressable onPress={() =>  Alert.alert('Add to Read')}>
                  <View style={styles.listButtonContainer}>
                      <Image source={require("../../../assets/img/wishlist-icon.png")} style={styles.listIcon}/>
                  </View>
              </Pressable>
              <Pressable onPress={handleAddBook}>
                  <View style={styles.listButtonContainer}>
                      <Image source={require("../../../assets/img/lists-icon.png")} style={styles.listIcon}/>
                  </View>
              </Pressable>
              <Pressable onPress={() =>  Alert.alert('Add to Wishlist')}>
                  <View style={styles.listButtonContainer}>
                      <Image source={require("../../../assets/img/read-icon.png")} style={styles.listIcon}/>
                  </View>
              </Pressable>
          </View>
          <View style={styles.reviewContainer}>
              <Pressable onPress={() =>  Alert.alert('Write Review')}>
                  <View style={styles.reviewButtonContainer}>
                      <Image source={require("../../../assets/img/review-icon.png")} style={styles.reviewIcon}/>
                  </View>
              </Pressable>
          </View>
          <View style={styles.textSection}>
               <Text style={styles.sectionTitle}>Descripción</Text>
                {info.description ? (
                  <Text style={styles.description}>{info.description}</Text>
                ) : (
                  <Text style={styles.noInfo}>No hay descripción disponible</Text>
                )}
                {/* SECCION de DETALLES */}
                <Text style={styles.detailsTitle}>Detalles</Text>
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
        </View>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla de detalles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080D17",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 140,
  },
  bottomSpace: {
    height: 80,
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
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
    flexDirection: 'column',
  },
  imageContainer: {
    width: 115,
    height: 160,
    overflow: 'hidden',
    backgroundColor: Colors.PLACEHOLDER,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    borderColor: "#FFCB20",
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginLeft: 30,
    marginBottom: 20,
    marginTop: "auto"
  },
  bookCover: {
    width: '100%',
    height: '100%',
    borderRadius: 5
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
  buttonContainer: {
    height: 16,
    width: 16,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20
  },
  icon: {
    height: "100%",
    width: "100%"
  },
  headerInfo: {
    flexDirection: "row",
    height: 200
  },
  headerRight: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: 20,
  },
  title: {
    fontFamily: 'Roboto_900Black',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 2
  },
  authors: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 2
  },
  publishedDate: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 12,
    color: '#D2D2D2',
    marginBottom: 20
  },
  stars: {
    height: 20,
    width: 144,
    marginBottom: 10
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 120,
    alignItems: "center"
  },
  listButtonContainer: {
    height: 32,
    width: 32,
  },
  listIcon: {
    height: "100%",
    width: "100%"
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    alignItems: "center"
  },
  reviewButtonContainer: {
    height: 46,
    width: 270
  },
  reviewIcon: {
    height: "100%",
    width: "100%"
  },
  textSection: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M,
  },
  detailsTitle: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M,
    marginTop: 30
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
  titleContainer: {
    width: 230,    
  }
});

export default DetailBook;