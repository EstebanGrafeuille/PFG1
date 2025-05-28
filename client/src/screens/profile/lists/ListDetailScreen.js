import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BooksProfileComp from "../../../components/BooksProfileComp";

export default function ListDetailScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.listDetailScreen}>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Pressable onPress={() => navigation.navigate("ListsBooksScreen")}>
            <View style={styles.buttonContainer}>
              <Image
                source={require("../../../../assets/img/back-icon-grey.png")}
                style={styles.icon}
              />
            </View>
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Literatura Rusa</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("EditListScreen")}>
            <View style={styles.buttonContainer}>
              <Image
                source={require("../../../../assets/img/edit-icon-yellow.png")}
                style={styles.icon}
              />
            </View>
          </Pressable>
        </View>
        <Text style={styles.author}>by user_name</Text>
        <BooksProfileComp />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listDetailScreen: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginTop: 30,
    borderRadius: 20
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 360,
    height: 50,
    marginTop: 20
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 24,
    color: "#FFCB20"
  },
  author: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 13,
    color: "#919191"
  },
  icon: {
    height: 26,
    width: 26
  }
});
