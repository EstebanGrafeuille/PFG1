import { View, Text, StyleSheet, Button, Pressable, Image, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListDetailScreen(){

    const navigation = useNavigation();

    return(
        <View style={styles.listDetailScreen}>
            <View style={styles.listHeader}>
                <Pressable onPress={() => navigation.navigate('ListDetailScreen')}>
                    <View style={styles.buttonContainer}>
                        <Image source={require("../../../../assets/img/back-icon-grey.png")} style={styles.backIcon}/>
                    </View>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Literatura Rusa</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('ListDetailScreen')}>
                    <View style={styles.buttonContainer}>
                        <Image source={require("../../../../assets/img/trash-icon-grey.png")} style={styles.backIcon}/>
                    </View>
                </Pressable>
            </View>
            <Text>Detail List Screen</Text>
            <Button title="Go Back" onPress={() => navigation.navigate('ListsBooksScreen')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listDetailScreen: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listHeader: {
        flexDirection: "row",
        height: 80,
    },
})