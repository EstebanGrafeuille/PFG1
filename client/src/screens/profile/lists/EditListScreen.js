// import { View, Text, StyleSheet, Button, Pressable, Image, Alert,ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import ListBooksRemove from "../../../components/ListBooksRemove";

import { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BooksInList from "../../../components/BooksInList";
import userBookService from "../../../services/userBook";
import { AuthContext } from "../../../context/AuthContext";

export default function EditListScreen() {
  const navigation = useNavigation();

  const { authData } = useContext(AuthContext);
  const [bookIds, setBookIds] = useState([]);

  const route = useRoute();
  const { listTitle } = route.params;

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const libros = await userBookService.getLista(authData.user.id, listTitle, authData.token);
        setBookIds(libros);
      } catch (error) {
        console.error("Error obteniendo libros de lista:", error.message);
      }
    };
    fetchLibros();
  }, []);

  // Manejar eliminar lista
  const hanldeDeleteList = async (list) => {
    try {
      await userBookService.removeList(authData.user.id, list, authData.token);
      navigation.navigate("ListNavigation");
    } catch (error) {
      console.error("Error al eliminar lista: ", error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.listDetailScreen}>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Pressable onPress={() => navigation.navigate("ListDetailScreen")}>
              <View style={styles.buttonContainer}>
                <Image
                  source={require("../../../../assets/img/back-icon-grey.png")}
                  style={styles.icon}
                />
              </View>
            </Pressable>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{listTitle}</Text>
            </View>
            {listTitle === "Favorites" ? (
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Good try...",
                    `${listTitle} is a default list, you can't delete it.`,
                    [
                      {
                        text: "OK"
                      }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <View style={styles.buttonContainer}>
                  <Image
                    source={require("../../../../assets/img/trash-icon-grey.png")}
                    style={styles.iconFav}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Delete List",
                    `Are you sure you want to delete "${listTitle}"?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: () => hanldeDeleteList(listTitle)
                      }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <View style={styles.buttonContainer}>
                  <Image
                    source={require("../../../../assets/img/trash-icon-grey.png")}
                    style={styles.icon}
                  />
                </View>
              </Pressable>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListsBooksScreen")}
            style={styles.doneBtn}
          >
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
          <ListBooksRemove ids={bookIds} lista={listTitle} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    width: "100%",
    borderRadius: 20
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 360,
    height: 80,
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
    color: "#919191",
    marginBottom: 50,
    marginTop: 15
  },
  icon: {
    height: 26,
    width: 26
  },
  iconFav: {
    height: 26,
    width: 26,
    opacity: 0.25
  },
  doneBtn: {
    height: 42,
    width: 130,
    backgroundColor: "#FFCB20",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100
  },
  btnText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    color: "#FFFFFF"
  }
});
