import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileHeader(props) {

    const navigation = useNavigation();

    const route = useRoute();

    const isFocused = (routeName) => route.name === routeName;

  return (
    <View>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      </View>
      <View style={styles.headerContainer }>
        <Text style={[styles.headerText, isFocused('ProfileSettings') && styles.headerTextFocused]} onPress={() => navigation.navigate('ProfileSettings')}>Profile</Text>
        <View style={styles.headerDivider}/>
        <Text style={[styles.headerText, isFocused('ReadBooks') && styles.headerTextFocused]} onPress={() => navigation.navigate('ReadBooks')}>Read</Text>
        <View style={styles.headerDivider}/>
        <Text style={[styles.headerText, isFocused('ListsNavigation') && styles.headerTextFocused]} onPress={() => navigation.navigate('ListsNavigation')}>Lists</Text>
        <View style={styles.headerDivider}/>
        <Text style={[styles.headerText, isFocused('WishlistBooks') && styles.headerTextFocused]} onPress={() => navigation.navigate('WishlistBooks')}>Next</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
    headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "static",
    marginTop: 0,
    marginBottom: "auto",
    alignItems: "center",
    height: 50,
    width: 360,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
  },

  headerTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
  },

  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 12,
  },

  headerText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 12,
    color: '#000000',
  },

  headerTextFocused: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 12,
    color: '#FFCB20',
  },

  headerDivider: {
    backgroundColor: "#FFCB20",
    height: "70%",
    width: 1,
    marginHorizontal: -35,
  }
});