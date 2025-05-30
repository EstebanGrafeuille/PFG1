import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewListComponent() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("CreateListScreen")}>
      <View style={styles.listContainer}>
        <Text style={styles.addList}>+</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 70,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFCB20",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20
  },

  addList: {
    fontFamily: "Roboto_900Black",
    fontSize: 30,
    color: "#FFCB20"
  }
});
