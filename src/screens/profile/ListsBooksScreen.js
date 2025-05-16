import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import BooksProfileComp from '../../components/BooksProfileComp';

export default function ListsBooksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProfileHeader />
      <Text style={styles.listTitle}>Listas</Text>
      <BooksProfileComp />
    </View>
  );
}

const styles = StyleSheet.create({

  listTitle: {
    paddingTop: 20,
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
  },
})