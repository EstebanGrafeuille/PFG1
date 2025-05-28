import ProfileHeader from '../../../components/ProfileHeader';
import ListComponent from '../../../components/ListComponent';
import NewListComponent from '../../../components/NewListComponent';
import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, ScrollView } from "react-native";
import userBookService from "../../../services/userBook";
import { AuthContext } from "../../../context/AuthContext";

const ListsBooksScreen = () => {
  const [listas, setListas] = useState([]);
  const { authData } = useContext(AuthContext);

  const fetchListas = async () => {
    try {
      const userBook = await userBookService.getListas(authData.user.id, authData.token);
      setListas((userBook[0] && userBook[0].listasUser) || []);
    } catch (error) {
      console.error("Error al obtener listas:", error.message);
    }
  };

  useEffect(() => {
    fetchListas();
  }, []);

    return (
    <View style={styles.listsBooksScreen}>
      <ProfileHeader headerTitle="YOUR LISTS"/>
      <ScrollView>
        <View style={styles.listColumn}>
            {listas.map((nombreLista, index) => (
              <ListComponent key={index} title={nombreLista} />
            ))}
          <NewListComponent />
          <View style={styles.extraSpace}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListsBooksScreen;

const styles = StyleSheet.create({
  
  listsBooksScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },

  listColumn: {
    flexDirection: "column",
    marginTop: 40,
  },

  listTitle: {
    paddingTop: 20,
    fontFamily: 'Roboto_900Black',
    fontSize: 18,
    color: '#333',
  },
  extraSpace: {
    height: 100
  }
})
