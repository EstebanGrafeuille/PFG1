import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TextInput,
  onChangeText,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import userBookService from "../../../services/userBook";
import { AuthContext } from "../../../context/AuthContext";

export default function CreateListScreen() {
  const [newListName, setNewListName] = useState("");
  const { authData } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleCreateList = async () => {
    if (newListName.trim() === "") {
      Alert.alert("Error", "El nombre de la lista no puede estar vacío.");
      console.log("Error", "El nombre de la lista no puede estar vacio")
      return; // detenemos la ejecución
    }

    try {
      await userBookService.addLista(authData.user.id, newListName, authData.token);
      setNewListName("");
      navigation.navigate("ListsBooksScreen");
    } catch (error) {
      console.error("Error al crear lista:", error.message);
      Alert.alert("Error", "Ocurrió un problema al crear la lista.");
    }
  };

  return (
    <View style={styles.listDetailScreen}>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Pressable onPress={() => navigation.navigate("ListsBooksScreen")}>
            <View style={styles.buttonContainer}>
              <Image
                source={require("../../../../assets/img/back-icon-white.png")}
                style={styles.icon}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.title}
            placeholder="New List Name"
            value={newListName}
            onChangeText={setNewListName}
          />
        </View>
        <Text style={styles.author}>by user_name</Text>
        <TouchableOpacity onPress={handleCreateList} style={styles.doneBtn}>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  listDetailScreen: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1
  },
  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFCB20",
    width: 320,
    marginTop: 80,
    borderRadius: 20,
    height: 420
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: 65,
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 24,
    color: "#FFFFFF",
    paddingBottom: 20,
    width: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  author: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "#FFFFFF",
    paddingBottom: 50
  },
  buttonContainer: {
    width: 26
  },
  icon: {
    height: 20,
    width: 20
  },
  doneBtn: {
    height: 60,
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    color: "#FFCB20"
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 270
  }
});
