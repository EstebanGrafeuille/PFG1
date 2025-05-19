import { View, Text, StyleSheet, Image } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import BooksProfileComp from '../../components/BooksProfileComp';

export default function WishlistScreen() {
  return (
    <View style={styles.wishlistScreen}>
      <ProfileHeader />
      <Text style={styles.listTitle}>Wishlist</Text>
      <BooksProfileComp />
    </View>
  );
}

const styles = StyleSheet.create({
  wishlistScreen: {
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    paddingTop: 20,
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
  },
})