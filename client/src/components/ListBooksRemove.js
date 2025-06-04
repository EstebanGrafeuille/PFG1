import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, Alert, Pressable, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import userBookService from "../services/userBook";
import { AuthContext } from "../context/AuthContext";

export default function ListBooksRemove({ids, lista}){

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authData } = useContext(AuthContext);

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

  // Manejar eliminar libro de lista
    const handleRemoveBook = async (bookId) => {
      try {
        await userBookService.removeFromLista(authData.user.id, lista, bookId, authData.token);
        setBooks(prev => prev.filter(b => b.id !== bookId));
      } catch (error) {
        console.error("Error al eliminar de lista: ", error.message);
      }

    };

    return(
        
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>     
            <Text style={styles.title}>Remove Books</Text>
            <View style={styles.listContainer}>
                {books.map((book) => (
                    <View key={book.id} style={styles.listItem}>
                        <Text style={styles.bookName}>{book.title}</Text>
                        <Pressable onPress={() => {handleRemoveBook(book.id); }}>
                            <Image source={require("../../assets/img/delete-icon-yellow.png")} style={styles.icon}/>
                        </Pressable>
                    </View>
                          ))}
            </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: 40
    },
  scrollContent: {
    flex: 1,
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