import { View, StyleSheet, Image, ScrollView } from 'react-native';

export default function BooksInList() {
  return (

    <ScrollView style={styles.scroll} >
        <View style={styles.booksContainer}>
            <View style={styles.booksColumn}>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/beyond-ocean.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/caged-birds.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/catch-22.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/color-purple.jpg")} style={styles.bookPhoto}/>
                </View>
            </View>
            <View style={styles.booksColumn}>
                <View style={styles.addButtonContainer}>
                    <Image source={require("../../assets/img/ad-logo.png")} style={styles.addButton}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/great-nachsby.jpeg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/get-in-trouble.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/girl-in-need.jpeg")} style={styles.bookPhoto}/>
                </View>
            </View>
            <View style={styles.booksColumn}>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/everything-is.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/handmaids-tale.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/little-prince.jpg")} style={styles.bookPhoto}/>
                </View>
                <View style={styles.bookContainer}>
                    <Image source={require("../../assets/img/bookCovers/the-road.jpg")} style={styles.bookPhoto}/>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  booksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },

  booksColumn: {
    flexDirection: "column",
    padding: 5,
  },
  
  bookContainer: {
    width: 110,              
    height: 180,             
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginBottom: 10,
  },

  bookPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
})