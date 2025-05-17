import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';


const BookItem = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('BookView', { volumeId: item.id })}>
    <View style={styles.itemContainer}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        {item.authors.length > 0 && (
          <Text style={styles.authors} numberOfLines={1}>{item.authors.join(', ')}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
      itemContainer: { flexDirection: 'row', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 },
      thumbnail: { width: 50, height: 75, borderRadius: 4, backgroundColor: '#f0f0f0' },
      placeholder: { alignItems: 'center', justifyContent: 'center' },
      textContainer: { flex: 1, marginLeft: 12, justifyContent: 'center' },
      title: { fontSize: 16, fontWeight: 'bold' },
      authors: { fontSize: 14, color: '#666', marginTop: 4 },
})

export default BookItem