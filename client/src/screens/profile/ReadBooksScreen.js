import { useEffect, useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import BooksProfileComp from '../../components/BooksProfileComp';
import BooksInList from '../../components/BooksInList';
import userBookService from "../../services/userBook";
import { AuthContext } from "../../context/AuthContext";

export default function ReadBooksScreen () {

  const { authData } = useContext(AuthContext);
  const [bookIds, setBookIds] = useState([]);

  // useEffect(() => {
  //   const fetchLibros = async () => {
  //     try {
  //       const libros = await userBookService.getLista(authData.user.id, "Read", authData.token);
  //       setBookIds(libros);
        
  //     } catch (error) {
  //       console.error("Error obteniendo libros de lista: Read", error.message);
  //     }
  //   };
  //   fetchLibros();
  // }, []);

  useFocusEffect(
  useCallback(() => {
    const fetchLibros = async () => {
      try {
        const libros = await userBookService.getLista(authData.user.id, "Read", authData.token);
        setBookIds(libros);
      } catch (error) {
        console.error("Error obteniendo libros de lista: Read", error.message);
      }
    };

    fetchLibros();

    // Cleanup opcional si necesitás cancelar algo al salir de la pantalla
    return () => {
      // limpiar si es necesario
    };
  }, [authData])
);

  return (
    <View style={styles.container}>
      <ProfileHeader headerTitle="YOUR LIBRARY"/>
      <BooksInList ids={bookIds} />
      <View style={{ height: 50 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  listTitle: {
    paddingTop: 20,
    fontFamily: "Roboto_900Black",
    fontSize: 18,
    color: "#333"
  }
});
