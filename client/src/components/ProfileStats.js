import { View, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState, useContext, useCallback } from 'react';
import userBookService from "../services/userBook";
import { AuthContext } from "../context/AuthContext";

export default function ProfileStats() {

const { authData } = useContext(AuthContext);
const [bookIds, setBookIds] = useState([]);
const [numberLists, setNumberLists] = useState(5)
const [numberLibros, setNumberLibros] = useState(5)

const fetchLibros = async () => {
  try {
    const librosObtenidos = await userBookService.getLista(authData.user.id, "Read", authData.token);
    setNumberLibros(librosObtenidos.length)
  } catch (error) {
    console.error("Error al obtener listas:", error.message);
  }
};

const fetchListas = async () => {
  try {
    const userBook = await userBookService.getListas(authData.user.id, authData.token);
    const listasObtenidas = (userBook[0] && userBook[0].listasUser) || [];
    setNumberLists(listasObtenidas.length)
  } catch (error) {
    console.error("Error al obtener listas:", error.message);
  }
};

useEffect(() => {
  fetchListas();
  fetchLibros();
}, []);

  return (
    <View style={styles.profileStatsContainer}>
      <View style={styles.horizontalLine} />
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Books Read</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>{numberLibros}</Text>
          <Image
            source={require("../../assets/img/bullet-point.png")}
            style={{ height: 8, width: 8 , marginLeft: 5}}
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Lists</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>{numberLists}</Text>
          <Image
            source={require("../../assets/img/bullet-point.png")}
            style={{ height: 8, width: 8 , marginLeft: 5}}
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Friends</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>Coming Soon...</Text>
          <Image
            source={require("../../assets/img/bullet-point.png")}
            style={{ height: 8, width: 8 , marginLeft: 5}}
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileStatsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
    height: 150,
    width: 380
  },

  profileStatRow: {
    flexDirection: "row",
    width: 380,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  statRight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  statText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15
  },

  statValue: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 15
  },

  horizontalLine: {
    height: 1,
    backgroundColor: "#D9D9D9"
  }
});
