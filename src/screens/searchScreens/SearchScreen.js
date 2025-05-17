
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Platform
} from 'react-native';
import BookItem from '../../components/BookItem';

const MAX_RESULTS = 40;



// Footer de carga
const LoadingFooter = ({ loadingMore }) => loadingMore ? <ActivityIndicator style={styles.loaderMore} size="small" /> : null;

// Barra de búsqueda
const SearchBar = ({ query, onChangeText, onSubmit }) => (
  <TextInput
    style={styles.input}
    placeholder="Buscar libros..."
    value={query}
    onChangeText={onChangeText}
    returnKeyType="search"
    onSubmitEditing={onSubmit}
  />
);

const SearchScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const debounceTimer = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const fetchBooks = async (searchTerm, index = 0) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) { setBooks([]); setTotalItems(0); setStartIndex(0); return; }
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController(); abortControllerRef.current = controller;

    index === 0 ? setLoading(true) : setLoadingMore(true);
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmed)}` +
                  `&maxResults=${MAX_RESULTS}&startIndex=${index}`;
      const response = await fetch(url, { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        const processed = (data.items||[]).map(i => ({
          id: i.id,
          title: i.volumeInfo?.title ?? 'Sin título',
          authors: i.volumeInfo?.authors ?? [],
          thumbnail: i.volumeInfo?.imageLinks?.thumbnail
        })).sort((a,b)=>a.title.localeCompare(b.title));
        setBooks(prev => index===0 ? processed : [...prev, ...processed]);
        setTotalItems(data.totalItems||0);
        setStartIndex(index + processed.length);
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error('Error fetching books:', e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleChangeText = text => {
    setQuery(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setStartIndex(0);
      fetchBooks(text, 0);
    }, 500);
  };
  const handleEndReached = () => {
    if (!loading && !loadingMore && books.length < totalItems) fetchBooks(query, startIndex);
  };
  const handleSubmit = () => { setStartIndex(0); fetchBooks(query, 0); };

  return (
    <View style={styles.container}>
      <SearchBar query={query} onChangeText={handleChangeText} onSubmit={handleSubmit} />
      {loading && startIndex === 0 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BookItem item={item} navigation={navigation} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<LoadingFooter loadingMore={loadingMore} />}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default SearchScreen



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 50 : 16 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 8, marginBottom: 12 },
  loaderMore: { marginVertical: 12 },
  thumbnail: { width: 50, height: 75, borderRadius: 4, backgroundColor: '#f0f0f0' }, placeholder: { alignItems: 'center', justifyContent: 'center' },
  detailContainer: { flex: 1, padding: 16 },
   
});