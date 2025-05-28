import { View, Text, StyleSheet, Alert, Pressable, Image } from "react-native";

export default function ListBooksRemove() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remove Books</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bookName}>Book Name</Text>
          <Pressable onPress={() => Alert.alert("You want to delete Book?")}>
            <Image
              source={require("../../assets/img/delete-icon-yellow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bookName}>Book Name</Text>
          <Pressable onPress={() => Alert.alert("You want to delete Book?")}>
            <Image
              source={require("../../assets/img/delete-icon-yellow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bookName}>Book Name</Text>
          <Pressable onPress={() => Alert.alert("You want to delete Book?")}>
            <Image
              source={require("../../assets/img/delete-icon-yellow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bookName}>Book Name</Text>
          <Pressable onPress={() => Alert.alert("You want to delete Book?")}>
            <Image
              source={require("../../assets/img/delete-icon-yellow.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    paddingTop: 40
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150,
    paddingBottom: 20
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 22,
    color: "#FFCB20",
    paddingBottom: 30
  },
  bookName: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#919191"
  },
  icon: {
    height: 22,
    width: 22
  }
});
