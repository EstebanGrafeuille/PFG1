import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function BooksInList({ids}) {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
  const fetchBooksByIds = async () => {
    try {
      const responses = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
          if (!res.ok) throw new Error(`Error al buscar el libro con ID ${id}`);
          return res.json();
        }));
      setBooks(processBookData(responses));
    } catch (error) {
      console.error('Error al buscar libros por ID:', error);
    } finally {
      setLoading(false);
    }
  };

  if (ids && ids.length > 0) {
    fetchBooksByIds();
  } else {
    setLoading(false);
  }
}, [ids]);

  // Process book data to match our app's format
  const processBookData = (items) => {
    return items.map(item => {
      // Asegurarse de que la URL de la imagen sea HTTPS
      let thumbnail = item.volumeInfo?.imageLinks?.thumbnail || null;
      if (thumbnail && thumbnail.startsWith('http:')) {
        thumbnail = thumbnail.replace('http:', 'https:');
      }
      
      return {
        id: item.id,
        title: item.volumeInfo?.title || 'Sin título',
        authors: item.volumeInfo?.authors || [],
        thumbnail: thumbnail
      };
    });
  };

const column1 = [];
const column2 = [];
const column3 = [];

books.forEach((book, index) => {
  if (index % 3 === 0) column1.push(book);
  else if (index % 3 === 1) column2.push(book);
  else column3.push(book);
});

  if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFCB20" />
        </View>
      );
    }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.columnsContainer}>
        {/* Columna 1 */}
        <View style={styles.column}>
          {column1.map((book) => (
            <TouchableOpacity
              key={book.id}
              onPress={() => navigation && navigation.navigate('BookView', { volumeId: book.id })}
            >
              {book.thumbnail ? (
                <Image source={{ uri: book.thumbnail }} style={styles.bookPhoto} resizeMode="cover" />
              ) : (
                <View style={[styles.bookPhoto, styles.noImageContainer]}>
                  <Text style={styles.noImageText}>{book.title.substring(0, 1)}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Columna 2 */}
        <View style={styles.column}>
          <TouchableOpacity style={styles.addButtonContainer}>
                <Image source={require("../../assets/img/ad-logo-2.png")} style={styles.addButton}/>
          </TouchableOpacity>
          {column2.map((book) => (
            <TouchableOpacity
              key={book.id}
              onPress={() => navigation && navigation.navigate('BookView', { volumeId: book.id })}
            >
              {book.thumbnail ? (
                <Image source={{ uri: book.thumbnail }} style={styles.bookPhoto} resizeMode="cover" />
              ) : (
                <View style={[styles.bookPhoto, styles.noImageContainer]}>
                  <Text style={styles.noImageText}>{book.title.substring(0, 1)}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Columna 3 */}
        <View style={styles.column}>
          {column3.map((book) => (
            <TouchableOpacity
              key={book.id}
              onPress={() => navigation && navigation.navigate('BookView', { volumeId: book.id })}
            >
              {book.thumbnail ? (
                <Image source={{ uri: book.thumbnail }} style={styles.bookPhoto} resizeMode="cover" />
              ) : (
                <View style={[styles.bookPhoto, styles.noImageContainer]}>
                  <Text style={styles.noImageText}>{book.title.substring(0, 1)}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1
},

columnsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: "90%",
  marginTop: 20,
},

column: {
  alignItems: 'center',
  padding: 5
},

bookPhoto: {
  width: 110,              
  height: 180,             
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#eee',
  marginBottom: 10,
},

 addButtonContainer: {
    width: 110,              
    height: 90,             
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginBottom: 10,
  },

  addButton: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCB20',
  },
  noImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  extraSpace: {
    height: 500,
    backgroundColor: "black"
  }
})