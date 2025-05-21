import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from '../../../components/ProfileHeader';
import ListComponent from '../../../components/ListComponent';
import NewListComponent from '../../../components/NewListComponent';

export default function ListsBooksScreen() {
  return (
    <View style={styles.listsBooksScreen}>
      <ProfileHeader headerTitle="YOUR LISTS"/>
      <View style={styles.listColumn}>
        <ListComponent />
        <ListComponent />
        <ListComponent />
        <NewListComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  listsBooksScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },

  listColumn: {
    flexDirection: "column",
    marginTop: 40,
  },

  listTitle: {
    paddingTop: 20,
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
  },
})