import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert, Pressable, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function ListBooksRemove({ids}){

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Remove Books</Text>
            <View style={styles.listContainer}>
                {books.map((book) => (
                    <View key={book.id} style={styles.listItem}>
                        <Text style={styles.bookName}>{book.title}</Text>
                        <Pressable onPress={() =>  Alert.alert('You want to delete' + book.title)}>
                            <Image source={require("../../assets/img/delete-icon-yellow.png")} style={styles.icon}/>
                        </Pressable>
                    </View>
                          ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        width: 200,
        paddingTop: 40
    },
    listContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 250,
        paddingBottom: 20
    },
    title: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: '#FFCB20',
        paddingBottom: 20
    },
    bookName: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: '#919191',
    },
    icon: {
        height: 22,
        width: 22
    },
})