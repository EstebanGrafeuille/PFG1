import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

const DetailBook = ({ route }) => {
  const { volumeId } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`)
      .then(res => res.json())
      .then(setDetails)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [volumeId]);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (!details) return <Text style={styles.errorText}>No se encontraron detalles</Text>;

  const info = details.volumeInfo;
  return (
    <View style={styles.detailContainer}>
      {info.imageLinks?.thumbnail && (
        <Image source={{ uri: info.imageLinks.thumbnail }} style={styles.detailImage} />
      )}
      <Text style={styles.detailTitle}>{info.title}</Text>
      {info.authors && <Text style={styles.detailAuthors}>{info.authors.join(', ')}</Text>}
      {info.description && <Text style={styles.detailDescription}>{info.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    detailContainer: { flex: 1, padding: 16 },
    loader: { marginTop: 20 },
    errorText: { textAlign: 'center', marginTop: 20, color: 'red' },
    detailImage: { width: 120, height: 180, alignSelf: 'center', marginBottom: 16 },
    detailTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    detailAuthors: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 12 },
    detailDescription: { fontSize: 14, lineHeight: 20 },
})

export default DetailBook