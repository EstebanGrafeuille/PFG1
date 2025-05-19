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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.homeHeader}>
          <View style={styles.homeHeaderBorder}>
            <View style={styles.bookBox}>
              <Text style={styles.headerTitle1}>Book</Text>
              <Text style={styles.headerTitle2}>Box</Text>
          </View>
            <Text style={styles.headersubTitle}>Find your next favourite book</Text>
          </View>
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>New Releases</Text>
          <BookRow books={newReleases} navigation={navigation} isYellow={true} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Best Ratings</Text>
          <BookRow books={bestRatings} navigation={navigation} isYellow={true} />
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
    backgroundColor: '#080D17',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#080D17"
  },
  scrollContent: {
    paddingBottom: 100,
    flexDirection: "column",
    backgroundColor: "#080D17",
    alignItems: "center",
  },
  homeHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 220,
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#FFCB20",
    borderWidth: 1
  },
  homeHeaderBorder: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 220,
    marginTop: 12,
    marginLeft: 12,
    borderColor: "#FFCB20",
    borderWidth: 1
  },
  rowContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15,
    marginTop: 10,
    height: 190,
  },
  rowTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#FFCB20',
    paddingBottom: 12,
  },
  bookBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerTitle1: {
    fontFamily: 'Roboto_900Black',
    fontSize: 26,
    color: '#FFFFFF',
  },
  headerTitle2: {
    fontFamily: 'Roboto_900Black',
    fontSize: 26,
    color: '#FFCB20',
  },
  headersubTitle: {
    fontFamily: 'Roboto_400Regular',
    paddingTop: 2,
    fontSize: 13,
    color: '#FFFFFF',
  },
  footerSpace: {
    height: 60, // Altura del footer
  }
});