import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import userBookService from "../../../services/userBook";
import { AuthContext } from "../../../context/AuthContext";

export default function CreateListScreen() {
  const [newListName, setNewListName] = useState("");
  const [inputError, setInputError] = useState("");
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleCreateList = async () => {
    const name = newListName.trim();

    if (!name) {
      setInputError("Please enter a name for your list.");
      return;
    }
    if (name.length < 4) {
      setInputError("List name must be at least 4 characters.");
      return;
    }
    if (name.length > 30) {
      setInputError("List name must be under 30 characters.");
      return;
    }

    setInputError(""); // Limpiar errores si pasa validaciones

    try {
      await userBookService.addLista(authData.user.id, name, authData.token);
      setNewListName("");
      navigation.navigate("ListsBooksScreen");
    } catch (error) {
      console.error("Error al crear lista:", error.message);
      setInputError("Something went wrong while creating your list.");
    }
  };

  const dismissKeyboardIfMobile = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboardIfMobile} accessible={false}>
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
              placeholderTextColor="#fff"
            />
            {inputError !== "" && <Text style={styles.errorText}>{inputError}</Text>}
          </View>

          <TouchableOpacity onPress={handleCreateList} style={styles.doneBtn}>
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  listDetailScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFCB20",
    width: 320,
    marginTop: 80,
    borderRadius: 20,
    height: 360
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
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 270,
    marginBottom: 15
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 24,
    color: "#FFFFFF",
    width: 200,
    textAlign: "center",
    marginBottom: 5
  },

  doneBtn: {
    height: 60,
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  btnText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    color: "#FFCB20"
  },
  buttonContainer: {
    width: 26
  },
  icon: {
    height: 20,
    width: 20
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center"
  }
});
