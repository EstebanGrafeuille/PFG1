import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ListComponent({title}){

  const navigation = useNavigation();
  const route = useRoute();

    return(
        <Pressable onPress={() => navigation.navigate('ListDetailNavigation')}>
            <View style={styles.listContainer}>
                <View style={styles.listLeft}>
                    <Text style={styles.listTitle}>{title}</Text>
                    <Text style={styles.listOwner}>Your List</Text>
                </View>
                <View style={styles.listRight}>
                    <Image source={require("../../assets/img/next-icon.png")}
                        resizeMode="contain" style={{height: 18, width: 18}} />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        height: 70,
        width: 350,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFCB20",
        borderRadius: 5,
        marginBottom: 20
    },
    listLeft: {
        flexDirection: "column",
        marginLeft: 20,
        height: 20,
        justifyContent: "center",
    },

    listRight: {
        marginRight: 20,
        marginLeft: "auto"
    },

    listTitle: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: '#FFFFFF',
    paddingBottom: 12,
  },
  listOwner: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 16,
    color: '#FFFFFF',
  },
})