//import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from '../../../components/ProfileHeader';
import ListComponent from '../../../components/ListComponent';
import NewListComponent from '../../../components/NewListComponent';

// export default function ListsBooksScreen() {
//   return (
//     <View style={styles.listsBooksScreen}>
//       <ProfileHeader headerTitle="YOUR LISTS"/>
//       <View style={styles.listColumn}>
//         <ListComponent />
//         <ListComponent />
//         <ListComponent />
//         <NewListComponent />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
  
//   listsBooksScreen: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5'
//   },

//   listColumn: {
//     flexDirection: "column",
//     marginTop: 40,
//   },

//   listTitle: {
//     paddingTop: 20,
//     fontFamily: 'Roboto_900Black',
//     fontSize: 18,
//     color: '#333',
//   },
// })

import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import userBookService from "../../../services/userBook"; // Ajustá el path
import { AuthContext } from "../../../context/AuthContext";

const ListsBooksScreen = ({ userId, token }) => {
  const [newListName, setNewListName] = useState("");
  const [listas, setListas] = useState([]);
  const { authData } = useContext(AuthContext);

  const fetchListas = async () => {
    try {
      const userBook = await userBookService.getListas(authData.user.id, authData.token);
      //setListas(userBook.listasUser || []);
      setListas((userBook[0] && userBook[0].listasUser) || []);
    } catch (error) {
      console.error("Error al obtener listas:", error.message);
    }
  };

  const handleCreateList = async () => {
    try {
      await userBookService.createUserList(authData.user.id, newListName, authData.token);
      setNewListName("");
      fetchListas();
    } catch (error) {
      console.error("Error al crear lista:", error.message);
    }
  };

  useEffect(() => {
    fetchListas();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Nombre de la nueva lista"
        value={newListName}
        onChangeText={setNewListName}
      />
      <Button title="Crear lista" onPress={handleCreateList} />
      <FlatList
        data={listas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default ListsBooksScreen;
