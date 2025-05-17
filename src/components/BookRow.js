import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';

export default function BookRow() {
  return (

    <ScrollView horizontal={true} style={styles.scroll} >            
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
            <View style={styles.bookContainer}>
                <Image source={require("../../assets/img/bookCovers/great-nachsby.jpeg")} style={styles.bookPhoto}/>
            </View>
            <View style={styles.bookContainer}>
                <Image source={require("../../assets/img/bookCovers/get-in-trouble.jpg")} style={styles.bookPhoto}/>
            </View>
            <View style={styles.bookContainer}>
                <Image source={require("../../assets/img/bookCovers/girl-in-need.jpeg")} style={styles.bookPhoto}/>
            </View>
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

})