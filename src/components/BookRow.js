import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native';

export default function BookRow({ books = [], navigation }) {
  // Si no hay libros, mostrar un mensaje
  if (!books || books.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No books available</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
      {books.map((book) => (
        <TouchableOpacity 
          key={book.id} 
          style={styles.bookContainer}
          onPress={() => navigation && navigation.navigate('BookView', { volumeId: book.id })}
        >
          {book.thumbnail ? (
            <Image 
              source={{ uri: book.thumbnail }} 
              style={styles.bookPhoto}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.bookPhoto, styles.noImageContainer]}>
              <Text style={styles.noImageText}>{book.title.substring(0, 1)}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  booksRow: {
    flexDirection: "row",
    padding: 5,
  },
  scroll: {
    paddingHorizontal: 0,
    padding: 0,
  },
  bookContainer: {
    width: 90,              
    height: 140,             
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginRight: 10,
  },
  bookPhoto: {
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
  emptyContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'grey',
    fontStyle: 'italic',
  }
});