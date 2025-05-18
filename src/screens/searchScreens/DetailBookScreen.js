import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const DetailBook = ({ route }) => {
  const { volumeId } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
        const data = await response.json();
        
        // Asegurarse de que la URL de la imagen sea HTTPS
        if (data.volumeInfo?.imageLinks?.thumbnail && data.volumeInfo.imageLinks.thumbnail.startsWith('http:')) {
          data.volumeInfo.imageLinks.thumbnail = data.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
        }
        
        setDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [volumeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFCB20" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron detalles del libro</Text>
      </View>
    );
  }

  const info = details.volumeInfo;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
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
              <Text style={styles.publishedDate}>Publicado: {info.publishedDate}</Text>
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
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          {info.description ? (
            <Text style={styles.description}>{info.description}</Text>
          ) : (
            <Text style={styles.noInfo}>No hay descripción disponible</Text>
          )}
        </View>
        
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
            <Text style={styles.detailValue}>{info.language || 'No disponible'}</Text>
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
        
        {/* Espacio adicional al final para evitar que el contenido sea tapado por el botón flotante y el footer */}
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      {/* Botón flotante para agregar a lista */}
      <TouchableOpacity style={styles.floatingButton} activeOpacity={0.8}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 140, // Espacio suficiente para el botón flotante y el footer
  },
  bottomSpace: {
    height: 80, // Altura adicional al final del contenido
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 2,
    borderBottomColor: '#FFCB20',
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
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
    backgroundColor: '#FFCB20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  authors: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  publishedDate: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  categoryBadge: {
    backgroundColor: '#FFCB20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  categoryText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 10,
    color: '#333',
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  noInfo: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 14,
    color: '#333',
    width: 80,
  },
  detailValue: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80, // Aumentado para evitar el footer menu (60px de altura + 20px de margen)
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFCB20',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DetailBook;