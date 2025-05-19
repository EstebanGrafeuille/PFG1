import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import BooksProfileComp from '../../components/BooksProfileComp';

export default function ListsBooksScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader headerTitle="YOUR LISTS"/>
      <BooksProfileComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  listTitle: {
    paddingTop: 20,
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
  },
})