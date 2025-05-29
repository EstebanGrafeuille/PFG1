// import { View, Text, StyleSheet, Button, Pressable, Image, Alert,ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import ListBooksRemove from '../../../components/ListBooksRemove';

import { useEffect, useState, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, Pressable, Image, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BooksInList from "../../../components/BooksInList";
import userBookService from "../../../services/userBook";
import { AuthContext } from "../../../context/AuthContext";

export default function EditListScreen(){

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

    return(
        <View style={styles.listDetailScreen}>
            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <Pressable onPress={() => navigation.navigate('ListDetailScreen')}>
                        <View style={styles.buttonContainer}>
                            <Image source={require("../../../../assets/img/back-icon-grey.png")} style={styles.icon}/>
                        </View>
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{listTitle}</Text>
                    </View>
                    <Pressable onPress={() =>  Alert.alert('You want to delete List?')}>
                        <View style={styles.buttonContainer}>
                            <Image source={require("../../../../assets/img/trash-icon-grey.png")} style={styles.icon}/>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.author}>by user_name</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ListsBooksScreen')} style={styles.doneBtn}>
                    <Text style={styles.btnText}>Done</Text>
                </TouchableOpacity>
                <ListBooksRemove ids={bookIds} />
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    listDetailScreen: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    listContainer:{
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
        height: 80,
        marginTop: 20,
    },
    title: {
        fontFamily: 'Roboto_900Black',
        fontSize: 24,
        color: '#FFCB20',
    },
    author: {
        fontFamily: 'Roboto_200ExtraLight',
        fontSize: 13,
        color: '#919191',
        marginBottom: 50,
        marginTop: 15
    },
    icon: {
        height: 26,
        width: 26
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
        fontFamily: 'Roboto_700Bold',
        fontSize: 20,
        color: '#FFFFFF',
    }
})