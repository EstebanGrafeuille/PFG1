import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import BookRow from '../components/BookRow';

export default function HomeScreen({ navigation }) {
  const [newReleases, setNewReleases] = useState([]);
  const [bestRatings, setBestRatings] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [nonFiction, setNonFiction] = useState([]);
  const [classics, setClassics] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch new releases (orderBy=newest)
        const newReleasesResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10'
        );
        const newReleasesData = await newReleasesResponse.json();
        
        // Fetch best ratings
        const bestRatingsResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10'
        );
        const bestRatingsData = await bestRatingsResponse.json();
        
        // Fetch fiction books
        const fictionResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=10'
        );
        const fictionData = await fictionResponse.json();
        
        // Fetch non-fiction books
        const nonFictionResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&maxResults=10'
        );
        const nonFictionData = await nonFictionResponse.json();
        
        // Fetch classics
        const classicsResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:classics&maxResults=10'
        );
        const classicsData = await classicsResponse.json();
        
        // Fetch science fiction
        const scifiResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:science+fiction&maxResults=10'
        );
        const scifiData = await scifiResponse.json();
        
        // Process the data
        setNewReleases(processBookData(newReleasesData.items || []));
        setBestRatings(processBookData(bestRatingsData.items || []));
        setFiction(processBookData(fictionData.items || []));
        setNonFiction(processBookData(nonFictionData.items || []));
        setClassics(processBookData(classicsData.items || []));
        setScienceFiction(processBookData(scifiData.items || []));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFCB20" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.homeScreen} contentContainerStyle={styles.scrollContent}>
        <View style={styles.homeHeader}>
          <View style={styles.bookBox}>
            <Text style={styles.headerTitle1}>Book</Text>
            <Text style={styles.headerTitle2}>Box</Text>
          </View>
          <Text style={styles.headersubTitle}>Check our latest recommendations!</Text>
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>New Releases</Text>
          <BookRow books={newReleases} navigation={navigation} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Best Ratings</Text>
          <BookRow books={bestRatings} navigation={navigation} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Fiction</Text>
          <BookRow books={fiction} navigation={navigation} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Non-Fiction</Text>
          <BookRow books={nonFiction} navigation={navigation} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Classics</Text>
          <BookRow books={classics} navigation={navigation} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Science Fiction</Text>
          <BookRow books={scienceFiction} navigation={navigation} />
        </View>
        
        {/* Espacio adicional para evitar que el contenido se oculte detrás del footer */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeScreen: {
    flexDirection: "column",
  },
  scrollContent: {
    paddingBottom: 100, // Espacio para el footer con margen adicional
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
  footerSpace: {
    height: 60, // Altura del footer
  }
});