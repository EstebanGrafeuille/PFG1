import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileHeader() {

    const navigation = useNavigation();

  return (
    <View style={styles.headerContainer }>
      <Text style={styles.headerText} onPress={() => navigation.navigate('ProfileSettings')}>Profile</Text>
      <View style={styles.headerDivider}/>
      <Text style={styles.headerText} onPress={() => navigation.navigate('ReadBooks')}>Read</Text>
      <View style={styles.headerDivider}/>
      <Text style={styles.headerText} onPress={() => navigation.navigate('ListsBooks')}>Lists</Text>
      <View style={styles.headerDivider}/>
      <Text style={styles.headerText} onPress={() => navigation.navigate('WishlistBooks')}>Next</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
    headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    width: "90%",
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
  },

  headerText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 12,
    color: '#000000',
  },

  headerDivider: {
    backgroundColor: "#FFCB20",
    height: "70%",
    width: 1,
    marginHorizontal: -35,
  }
});