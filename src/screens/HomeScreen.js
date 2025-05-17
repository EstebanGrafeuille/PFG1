import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BookRow from '../components/BookRow';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.homeScreen}>
      <View style={styles.homeHeader}>
        <View style={styles.bookBox}>
          <Text style={styles.headerTitle1}>Book</Text>
          <Text style={styles.headerTitle2}>Box</Text>
        </View>
        <Text style={styles.headersubTitle}>Check our latest recomendations!</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>New Releases</Text>
        <BookRow />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>Best Ratings</Text>
        <BookRow />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>Latest</Text>
        <BookRow />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>Latest</Text>
        <BookRow />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  homeScreen: {
    flexDirection: "column",
    marginTop: 10
  },

  homeHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginTop: 10,
  },

  rowContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 10,
    paddingLeft: 15,
    marginTop: 0,
    height: 200,
    borderBottomWidth: 2,
    borderBottomColor: "#FFCB20",
    borderTopWidth: 0,
    borderTopColor: "grey"
  },

   rowTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#000000',
    paddingBottom: 5,
  },

  bookBox: {
    flexDirection: "row",
    alignItems: "center"
  },

  headerTitle1: {
    fontFamily: 'Roboto_900Black',
    fontSize: 24,
    color: '#FFCB20',
  },

  headerTitle2: {
    fontFamily: 'Roboto_900Black',
    fontSize: 24,
    color: 'grey',
  },

  headersubTitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: 'grey',
  },

})