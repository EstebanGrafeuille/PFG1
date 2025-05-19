import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';

export default function Notification({isNew}){
    return(
        <View style={isNew ? styles.notificationContainerNew : styles.notificationContainer}>
            <View style={styles.photoContainer}>
                <Image source={require("../../assets/img/profile-picture-sample.png")}
                    style={{height: 32, width: 32}}/>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.textUp}>
                    <Text style={styles.profileName}>Gonzalo_56</Text>
                    <Text style={styles.rating}>Rated 3.5 ⭐</Text>
                </View>
                <View style={styles.textDown}>
                    <Text style={styles.bookName}>El Castillo - Franz Kafka - </Text>
                    <Text style={styles.timeText}>Yesterday</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Image source={require("../../assets/img/next-icon.png")}
                    style={{height: 18, width: 18}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notificationContainerNew: {
        flexDirection: "row",
        backgroundColor: "#1D222B",
        width: 362,
        height: 70,
        borderRadius: 8,
        borderColor: "#FFCB20",
        borderWidth: 1,
        marginBottom: 20
    },

    notificationContainer: {
        flexDirection: "row",
        backgroundColor: "#1D222B",
        width: 362,
        height: 70,
        borderRadius: 8,
        borderWidth: 0,
        marginBottom: 20
    },

    photoContainer: {
        height: "100%",
        width: 32,
        marginLeft: 15,
        flexDirection: "column",
        justifyContent: "center"
    },

    textContainer: {
        height: 70,
        marginLeft: 15,
        flexDirection: "column",
        justifyContent: "center",
    },

    buttonContainer: {
        marginLeft: "auto",
        marginRight: 10,
        width: 18,
        justifyContent: "center"
    },

    textUp: {
        flexDirection: "row",
        paddingBottom: 4
    },

    textDown: {
        flexDirection: "row",
    },

    profileName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 14,
    color: '#FFFFFF',
  },

  rating: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    marginTop: -4,
    marginLeft: 10,
    color: '#FFFFFF',
  },

  bookName: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },

  timeText: {
    fontFamily: 'Roboto_200ExtraLight_Italic',
    fontSize: 12,
    color: '#FFFFFF',
  },

})