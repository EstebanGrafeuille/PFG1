import { View, Text, StyleSheet, ScrollView } from "react-native";
import Notification from "../components/Notification";

export default function SocialScreen() {
  return (
    <ScrollView style={styles.socialScreen}>
      <View style={styles.socialHeader}>
        <Text style={styles.headerTitle1}>Working on it</Text>
        <Text style={styles.headerTitle2}>• Coming soon...</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Notification isNew={true} />
        <Notification isNew={true} />
        <Notification isNew={false} />
        <Notification isNew={false} />
        <Notification isNew={false} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  socialScreen: {
    flexDirection: "column",
    marginTop: 0,
    backgroundColor: "#080D17"
  },

  socialHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 30,
    marginTop: 30
  },

  headerTitle1: {
    fontFamily: "Roboto_900Black",
    fontSize: 24,
    color: "#FFFFFF",
    paddingBottom: 5
  },

  headerTitle2: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#FFFFFF",
    paddingBottom: 5
  },

  notificationContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  }
});
